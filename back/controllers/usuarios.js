const usuModel = require('../models/usuarios')

let result = "";
let response = "";
var usuario = {
    id: 0,
    nome: "",
    email: "",
    senha: "",
    perfil: 0
}

//GET rota => /noticias
//retorna todas as noticias
exports.obter = async (req, res, next) => {
    try {

        result = await usuModel.obter();

        if (result.retorno) {

            response = {
                usuarios: result.retornoBD.map(usu => {
                    return{        
                        id: usu.usu_id,
                        nome: usu.usu_nome,
                        email: usu.usu_email,
                        senha: usu.usu_senha,
                        perfil: usu.usu_perfil
                    }
                })
            }

            return res
                    .status(200)
                    .json({ 
                        msg: result.msg,
                        retorno: true,
                        response 
                    })
        }else{
            return res
                    .status(400)
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
//POST rota => /usuarios
//cadastra um usuário
exports.cadastrar = async (req, res, next) => {
    try {

        const usEmail = req.body.email;

        result = await usuModel.duplicado(usEmail);

        if (result.retorno) {
            return res
                    .status(400)
                    .json({
                        msg: result.msg,
                        retorno: false
                    })
        }else{

            usuario = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                perfil: req.body.perfil
            }

            result = await usuModel.cadastrar(usuario);

            if(result.retorno){
                return res
                        .status(200)
                        .json({ 
                            msg: "Usuário cadastrado com sucesso!",
                            retorno: true
                         })
            }else{
                return res
                        .status(400)
                        .json({   
                            msg: result.msg,
                            retorno: false 
                        })
            }
        }
    }
    catch (e) {
        return res
                .status(400)
                .json({ 
                    msg: "Falha de conexão, revise sua conexão com a internet.",
                    retorno: false, 
                    response: e 
                })
    }
}
//POST rota => /usuarios/:email
//altera somente a senha do usuário
exports.buscaToken = async (req, res, next) => {
    try {

        var usuEmail = req.body.email;

        if (usuEmail.length > 0){

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
                        })
                }else{
                    return res
                            .status(400)
                            .json({  
                                msg: result.msg,
                                retorno: false
                             })
                }                
            }else{
                return res
                        .status(400)
                        .json({  
                            msg: result.msg,
                            retorno: false
                         })
            }
        }else{
            return res
                    .status(400)
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