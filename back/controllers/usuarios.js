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

//GET rota => /usuarios
//retorna todos os usuários
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
//POST rota => /usuarios
//cadastra um usuário
exports.cadastrar = async (req, res, next) => {
    try {

        const usEmail = req.body.email;

        result = await usuModel.duplicado(usEmail);

        if (result.retorno) {
            return res
                    .status(500)
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
                        .status(500)
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
//PATCH rota => /usuarios/id
//altera somente a senha do usuário
exports.altSenha = async (req, res, next) => {
    try {

        result = await usuModel.obterEmail();

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