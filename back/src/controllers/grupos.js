const gruModel = require('../models/grupos');
const proModel = require('../models/produtos');
const val = require('../services/utils');

var result = "";

//GET rota => /grupos
//obtem todos os grupos
exports.obter = async (req, res, next) => {
    try {
        result = await gruModel.obter();

        if (result.retorno) {

            response = {
                grupos: result.retornoBD.map(gru => {
                    return{        
                        id: gru.gru_id,
                        nome: gru.gru_nome,                
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
//GET rota => /grupos/:id
//obtem todos os grupos segundo o id de certo grupo
exports.obterPorGrupoId = async (req, res, next) => {
    try {

        const id = req.params.id,

        result = await gruModel.obterGrupoPorId(id);

        if (result.retorno) {

            response = {
                grupos: result.retornoBD.map(gru => {
                    return{ 
                        id: gru.gru_id,
                        nome: gru.gru_nome,                
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
//POST rota => /grupos
//cadastra um grupo
exports.cadastrar = async (req, res, next) => {
    try {
        var grupo = {
            nome: "",
            email: "",
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

        grupo = {
            nome: req.body.nome,
            email: req.body.email,
            perfil: perfil
        }
        
        result = val.grupo(grupo.nome, grupo.email, grupo.perfil);

        if(result.retorno){

            result = "";
            result = await gruModel.obterGrupoPorNome(grupo.nome);

            if(!result.retorno){      

                result = "";                    
                result = await gruModel.cadastrar(grupo.nome);

                if(result.retorno){

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
                        msg: "Já existe grupo cadastrado com esse nome.",
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
//PUT rota => /grupos/:id
//atualiza um grupo
exports.atualizar = async (req, res, next) => {
    try {
        var grupo = {
            id:"",
            nome: "",
            email: "",
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

        grupo = {
            id: req.params.id,
            nome: req.body.nome,
            email: req.body.email,
            perfil: perfil
        }
                
        result = val.grupo(grupo.nome, grupo.email, grupo.perfil);

        if(result.retorno){
            
            result = "";
            result = await gruModel.obterGrupoPorNome(grupo.nome);

            if(!result.retorno){    

                result = "";                    
                result = await gruModel.atualizar(grupo.nome, grupo.id);

                if(result.retorno){

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
                        msg: "Já existe grupo cadastrado com esse nome.",
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
//DELETE rota => /grupos/:id
//apaga um grupo
exports.apagar = async (req, res, next) => {
    try {
        
        var grupo = {
            id:"",
            nome: "",
            email: "",
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

        grupo = {
            id: req.params.id,
            nome: "testeeee",
            email: req.headers.email,
            perfil: perfil
        }
        
        result = val.grupo(grupo.nome, grupo.email, grupo.perfil);

        if (result.retorno) {

            resul = "";
            result = await gruModel.obterGrupoPorId(grupo.id);
            
            if (result.retorno) {

                resul = "";
                result = await proModel.obterProdutoPorGrupoId(grupo.id);

                if (!result.retorno) {
                    
                    result = "";                
                    result = await gruModel.apagar(grupo.id);
    
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
                            msg: "Grupo vinculado a produtos, apague os produtos antes de fazer essa ação!",
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