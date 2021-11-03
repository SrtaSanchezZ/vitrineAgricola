const usuModel = require('../models/usuarios');
const val = require('../services/utils');

var result = "";

//GET rota => /usuarios
//obtem todas os usuarios
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
//GET rota => /usuarios/:id
//obtem suario por id
exports.obterId = async (req, res, next) => {
    try {

        var id = req.params.id;
        result = await usuModel.obterId(id);

        if (result.retorno) {

            console.log(result.retornoBD)

            response = {
                usuario: result.retornoBD.map(usu => {
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
//cadastra um usuario
exports.cadastrar = async (req, res, next) => {
    try {
        
        var usuario = {
            nome: "",
            email: "",
            senha: "",
            perfil: ""
        }

        var perfil = req.body.perfil;      
        
        if(perfil === "master"){
            perfil = 1;
        }
        if(perfil === "redator"){
            perfil = 2;
        }
        if(perfil === "vendedor"){
            perfil = 3;
        }

        usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            perfil: perfil
        }

        result = val.usuario(usuario.nome, usuario.email, usuario.senha, usuario.perfil);

        if(result.retorno){

            result = "";

            result = await usuModel.obterEmail(usuario.email);

            if(!result.retorno){ 
                
                result = "";
                    
                result = await usuModel.cadastrar(usuario.nome, usuario.email, usuario.senha, usuario.perfil);

                if(result.retorno){

                    return res
                            .status(200)
                            .json({ 
                                msg: "Usuário Cadastrado com sucesso!",
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
                        msg: "Já existe usuário cadastrado com esse e-mail.",
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
        

    } catch (e) {
        return res
            .status(400)
            .json({ 
                msg: "Falha de conexão, revise seu acesso a internet.",
                retorno: false, 
                response: e 
            })
    }
}
//PUT rota => /usuarios/:id
//atualiza um usuario
exports.atualizar = async (req, res, next) => {
    try {
        var usuario = {
            id:"",
            nome: "",
            email: "",
            senha: "",
            perfil: ""
        }

        var perfil = req.body.perfil;      
        
        if(perfil === "master"){
            perfil = 1;
        }
        if(perfil === "redator"){
            perfil = 2;
        }
        if(perfil === "vendedor"){
            perfil = 3;
        }

        usuario = {
            id: req.params.id,
            nome: req.body.nome,
            senha: req.body.senha,
            email: req.body.email,
            perfil: perfil
        }
        
        result = val.usuario(usuario.nome, usuario.email, usuario.senha, usuario.perfil);

        if(result.retorno){
            
            result = "";

            result = await usuModel.obterEmail(usuario.email);

            if(result.retorno){         

                result = "";
                    
                result = await usuModel.atualizar(usuario.nome, usuario.email, usuario.senha, usuario.perfil, usuario.id);

                if(result.retorno){

                    return res
                            .status(200)
                            .json({ 
                                msg: "Usuário atualizado com sucesso!",
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
                        msg: "Não existe usuário cadastrado com esse e-mail.",
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
 
    }catch (e) {
        return res
            .status(400)
            .json({ 
                msg: "Falha de conexão, revise seu acesso a internet.",
                retorno: false, 
                response: e 
            })
    }
}
//DELETE rota => /usuarios/:id
//apaga um usuario
exports.apagar = async (req, res, next) => {
    try {
        
        var usuario = {
            id:"",
            nome: "",
            email: "",
            senha: "",
            perfil: ""
        }

        var perfil = req.headers.perfil;      
        
        if(perfil === "master"){
            perfil = 1;
        }
        if(perfil === "redator"){
            perfil = 2;
        }
        if(perfil === "vendedor"){
            perfil = 3;
        }

        usuario = {
            id: req.params.id,
            nome: req.headers.nome,
            senha: req.headers.senha,
            email: req.headers.email,
            perfil: perfil
        }
        
        result = val.usuario(usuario.nome, usuario.email, usuario.senha, usuario.perfil);

        if (result.retorno) {
            
            result = "";

            result = await usuModel.obterEmail(usuario.email);

            if(result.retorno){         

                result = "";
                    
                result = await usuModel.apagar(usuario.id);

                if(result.retorno){

                    return res
                            .status(200)
                            .json({ 
                                msg: "Usuário apagado com sucesso!",
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
                        msg: "Não existe usuário cadastrado com esse e-mail.",
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