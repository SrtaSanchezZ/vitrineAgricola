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
                        valor: pro.pro_valor,
                        quantidade: pro.pro_quantidade                    
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
            valor: "",
            quantidade: "",
            email: "",
            perfil: "",
            imagem: ""
        }

        produto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            grupo: req.body.grupo,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            email: req.body.email,
            perfil: req.body.perfil,
            imagem: '/files/' + req.file.filename
        }
        
        result = val.produto(produto.nome, produto.descricao, produto.grupo, produto.valor, produto.quantidade, produto.email, produto.perfil);

        if(result.retorno){

            result = "";

            result = await proModel.obterProdutoPorNome(produto.nome);

            if(!result.retorno){      

                result = "";
                    
                result = await proModel.cadastrar(produto.nome, produto.descricao, produto.grupo, produto.valor, produto.quantidade, produto.imagem);

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
            valor: "",
            quantidade: "",
            email: "",
            perfil: ""
        }

        produto = {
            id: req.params.id,
            nome: req.body.nome,
            descricao: req.body.descricao,
            grupo: req.body.grupo,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            email: req.body.email,
            perfil: req.body.perfil
        }
        
        result = val.produto(produto.nome, produto.descricao, produto.grupo, produto.valor, produto.quantidade, produto.email, produto.perfil);

        if(result.retorno){
            
            result = "";

            result = await proModel.obterProdutoPorNome(produto.nome);

            if(!result.retorno){    

                result = "";
                    
                result = await proModel.atualizar(produto.id, produto.nome, produto.descricao, produto.grupo, produto.valor, produto.quantidade);

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
            valor: "",
            quantidade: "",
            email: "",
            perfil: ""
        }

        produto = {
            id: req.params.id,
            nome: "testeeee",
            descricao: "testeeee",
            grupo: "testeeee",
            valor: 0.00,
            quantidade: 0,
            email: req.headers.email,
            perfil: req.headers.perfil
        }
        
        result = val.produto(produto.nome, produto.descricao, produto.grupo, produto.valor, produto.quantidade, produto.email, produto.perfil);

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