const proModel = require('../models/produtos');
const val = require('../services/utils');

var result = "";

//GET rota => /produtos
//obtem todos os produtos
exports.obter = async (req, res, next) => {
    try {

        result = await proModel.obter();

        if (result.retorno) {

            response = {
                produtos: result.retornoBD.map(pro => {
                    return{        
                        id: pro.pro_id,
                        nome: pro.pro_nome,
                        descricao: pro.pro_descricao,
                        grupo: pro.pro_grupo,
                        imagem: pro.pro_imagem,                   
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
//GET rota => /produtos/:id
//obtem todos os produtos segundo o id de certo grupo
exports.obterPorGrupoId = async (req, res, next) => {
    try {

        const id = req.params.id,

        result = await proModel.obterProdutoPorGrupoId(id);

        if (result.retorno) {

            response = {
                produtos: result.retornoBD.map(pro => {
                    return{        
                        id: pro.pro_id,
                        nome: pro.pro_nome,
                        descricao: pro.pro_descricao,
                        grupo: pro.pro_grupo,
                        imagem: pro.pro_imagem,                  
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
//POST rota => /produtos
//cadastra um produto
exports.cadastrar = async (req, res, next) => {
    try {
        var produto = {
            nome: "",
            descricao: "",
            grupo: "",
            email: "",
            perfil: "",
            imagem: ""
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

        produto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            grupo: req.body.grupo,
            email: req.body.email,
            perfil: perfil,
            imagem: '/files/' + req.file.filename
        }
        
        result = val.produto(produto.nome, produto.descricao, produto.grupo, produto.email, produto.perfil);

        if(result.retorno){

            result = "";

            result = await proModel.obterProdutoPorNome(produto.nome);

            if(!result.retorno){      

                result = "";
                    
                result = await proModel.cadastrar(produto.nome, produto.descricao, produto.grupo, produto.imagem);

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
                        msg: "Já existe produto cadastrado com esse nome.",
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
//PUT rota => /produtos/:id
//atualiza um produto
exports.atualizar = async (req, res, next) => {
    try {
        var produto = {
            id:"",
            nome: "",
            descricao: "",
            grupo: "",
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

        produto = {
            id: req.params.id,
            nome: req.body.nome,
            descricao: req.body.descricao,
            grupo: req.body.grupo,
            email: req.body.email,
            perfil: perfil
        }
        
        result = val.produto(produto.nome, produto.descricao, produto.grupo, produto.email, produto.perfil);

        if(result.retorno){
            
            result = "";

            result = await proModel.obterProdutoPorNome(produto.nome);

            if(!result.retorno){    

                result = "";
                    
                result = await proModel.atualizar(produto.nome, produto.descricao, produto.grupo, produto.id);

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
                        msg: "Já existe produto cadastrado com esse nome.",
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
//DELETE rota => /produtos/:id
//apaga um produto
exports.apagar = async (req, res, next) => {
    try {
        
        var produto = {
            id:"",
            nome: "",
            descricao: "",
            grupo: "",
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

        produto = {
            id: req.params.id,
            nome: "testeeee",
            descricao: "testeeee",
            grupo: "testeeee",
            email: req.headers.email,
            perfil: perfil
        }
        
        result = val.produto(produto.nome, produto.descricao, produto.grupo, produto.email, produto.perfil);

        if (result.retorno) {

            resul = "";

            result = await proModel.obterProdutoPorId(produto.id);
            
            if (result.retorno) {

                produto = {
                    id: result.retornoBD[0].pro_id,
                    imagem: result.retornoBD[0].pro_imagem
                }

                var img = produto.imagem;
                img = img.split('/files/');

                result = val.apagaImagem(img[1]);

                result = "";
                
                result = await proModel.apagar(produto.id);

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