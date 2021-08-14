const usuModel = require('../models/usuarios')
const val = require('../services/utils')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let result = "";
var usuario = {
    id: 0,
    nome: "",
    email: "",
    senha: "",
    perfil: 0
}

//POST rota => /acesso
//Login
exports.login = async (req, res, next) => {
    try {
        const usEmail = req.body.email;
        const usSenha = req.body.senha;

        result = await usuModel.obterEmail(usEmail);

        if (result.retorno){

            usuario = {
                id: result.retornoBD[0].usu_id,
                nome: result.retornoBD[0].usu_nome,
                email: result.retornoBD[0].usu_email,
                senha: result.retornoBD[0].usu_senha,
                perfil: result.retornoBD[0].usu_perfil
            }

            bcrypt.compare(usSenha, usuario.senha, async (err, result) => {
                if(result){

                    if(usuario.perfil === 1){
                        return res
                            .status(200)
                            .json({ 
                                msg: result.msg,
                                retorno: true,
                                email: usuario.email,
                                nome: usuario.nome,
                                perfil: "master"
                            })
                    }else{                        
                        if(usuario.perfil === 2){
                            return res
                                .status(200)
                                .json({ 
                                    msg: result.msg,
                                    retorno: true,
                                    email: usuario.email,
                                    nome: usuario.nome,
                                    perfil: "redator"
                                })
                        }else{                       
                            if(usuario.perfil === 3){
                                return res
                                    .status(200)
                                    .json({ 
                                        msg: result.msg,
                                        retorno: true,
                                        email: usuario.email,
                                        nome: usuario.nome,
                                        perfil: "vendedor"
                                    })    
                            }else{
                                return res
                                        .status(500)
                                        .json({  
                                            msg: "Dados de Acesso invalidos.",
                                            retorno: false
                                         })                                
                            }
                        }
                    }
                    
                }else{
                    return res
                            .status(500)
                            .json({  
                                msg: "Senha inválida.",
                                retorno: false
                             })
                }
            })
        }else{
            return res
                    .status(500)
                    .json({  
                        msg: result.msg,
                        retorno: false
                     })
        }
    }
    catch (e) {
        return res
                .status(400)
                .json({ 
                    msg: "Falha de conexão, revise seu acesso a internet.",
                    retorno: false, 
                    response: e 
                })
    }
}
//PATCH rota => /acesso
//Valida E-mail e envia e-mail de validação
exports.validaEmail = async (req, res, next) => {
    try {
        const usEmail = req.body.email;

        result = await usuModel.obterEmail(usEmail);

        if (result.retorno){

            result = await usuModel.alterarToken(usEmail);

            if (result.retorno) {

                var token = result.token;

                result = "";

                result = await usuModel.emailResenha(usEmail, token);

                if (result.retorno) {

                    return res
                        .status(200)
                        .json({ 
                            msg: result.msg,
                            retorno: true
                            //token: token
                        })
                }else{
                    return res
                            .status(500)
                            .json({  
                                msg: result.msg,
                                retorno: false
                             })
                }                
            }else{
                return res
                        .status(500)
                        .json({  
                            msg: result.msg,
                            retorno: false
                         })
            }
        }else{
            return res
                    .status(500)
                    .json({  
                        msg: result.msg,
                        retorno: false
                     })
        }
    }
    catch (e) {
        return res
                .status(400)
                .json({ 
                    msg: "Falha de conexão, revise seu acesso a internet.",
                    retorno: false, 
                    response: e 
                })
    }
}
//PATCH rota => /acesso/:token
//Troca a Senha
exports.altSenha = async (req, res, next) => {
    try {
        var nSenha = req.body.senha;
        var token = req.params.token;        

        result = val.reSenha(nSenha, token);

        if (result.retorno){

           jwt.verify(token, process.env.JWT_KEY, async function (error, decodedToken) {

                if (error) {
                    result = { retorno: false, msg: 'Token inválido ou expirado!'}
                }else{
                    
                    var email = decodedToken.email;
                
                    result = await usuModel.obterToken(email);
        
                    if (result.retorno) {

                        result = await usuModel.Resenha(nSenha, email);
                        
                        if(result.retorno){
                            return res
                                .status(200)
                                .json({ 
                                    msg: "Senha atualizada com sucesso!",
                                    retorno: true
                                })
                        }else{
                            return res
                                    .status(500)
                                    .json({  
                                        msg: result.msg,
                                        retorno: false
                                     })
                        }
                    }else {
                        return res
                                .status(500)
                                .json({  
                                    msg: result.msg,
                                    retorno: false
                                 })
                    }
                }
            });           
        }else{
            return res
                    .status(500)
                    .json({  
                        msg: result.msg,
                        retorno: false
                     })
        }
    }
    catch (e) {
        return res
                .status(400)
                .json({ 
                    msg: "Falha de conexão, revise seu acesso a internet.",
                    retorno: false, 
                    response: e 
                })
    }
}