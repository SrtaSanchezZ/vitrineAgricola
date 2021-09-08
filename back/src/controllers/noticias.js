const notModel = require('../models/noticias');
const usuModel = require('../models/usuarios');
const val = require('../services/utils');

var result = "";

//GET rota => /noticias
//obtem todas as noticias
exports.obter = async (req, res, next) => {
    try {

        result = await notModel.obter();

        if (result.retorno) {

            response = {
                noticias: result.retornoBD.map(not => {
                    return{        
                        id: not.not_id,
                        titulo: not.not_titulo,
                        texto: not.not_texto,
                        imagem: not.not_imagem,
                        data: not.not_data,
                        destaque: not.not_destaque,
                        usuario: not.not_usu_id
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
//POST rota => /noticias
//cadastra uma noticia
exports.cadastrar = async (req, res, next) => {
    try {
        var noticia = {
            titulo:"",
            texto:"",
            email:"",
            perfil:"",
            imagem:""
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

        noticia = {
            titulo: req.body.titulo,
            texto: req.body.texto,
            email: req.body.email,
            perfil: perfil,
            imagem: '/files/' + req.file.filename
        }

        result = val.noticia(noticia.titulo, noticia.texto, noticia.email, noticia.perfil);

        if(result.retorno){
            
            result = "";
            result = await notModel.obterNoticiaPorTitulo(noticia.titulo);

            if(!result.retorno){
            
                result = "";
                result = await usuModel.obterEmail(noticia.email);

                if(result.retorno){  

                    var noticiaC = {
                        titulo: "",
                        texto: "",
                        id: "",
                        imagem: "",
                        destaque: 0
                    }  

                    noticiaC = {
                        titulo: noticia.titulo,
                        texto: noticia.texto,
                        id: result.retornoBD[0].usu_id,
                        imagem: noticia.imagem,
                        destaque: 1
                    }  

                    result = "";                        
                    result = await notModel.obterNoticiasDestacadas(); 

                    if(!result.retorno){
                        result = "";                        
                        result = await notModel.cadastrar(noticiaC.titulo, noticiaC.texto, noticiaC.id, noticiaC.imagem, noticiaC.destaque);

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
                        if( result.retornoBD.length > 2){
                            noticiaC.destaque = 0;
                        } 

                        result = "";                        
                        result = await notModel.cadastrar(noticiaC.titulo, noticiaC.texto, noticiaC.id, noticiaC.imagem, noticiaC.destaque);

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
                    }
                }else{                         
                    return res
                        .status(400)
                        .json({ 
                            msg: "Você não tem permissão para cadastrar notícias.",
                            retorno: false
                        })
                }
            }else{                           
                return res
                    .status(400)
                    .json({ 
                        msg: "Já existe notícia cadastrada com esse título.",
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
//PUT rota => /noticias/:id
//atualiza uma noticia
exports.atualizar = async (req, res, next) => {
    try {
        var noticia = {
            id:"",
            titulo:"",
            texto:"",
            email:"",
            perfil:""
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

        noticia = {
            id: req.params.id,
            titulo: req.body.titulo,
            texto: req.body.texto,
            email: req.body.email,
            perfil: perfil
        }
        
        result = val.noticia(noticia.titulo, noticia.texto, noticia.email, noticia.perfil);

        if(result.retorno){
            
            result = "";

            result = await notModel.obterNoticiaPorTitulo(noticia.titulo);

            if(!result.retorno){
            
                result = "";

                result = await usuModel.obterEmail(noticia.email);

                if(result.retorno){  

                    var noticiaC = {
                        id: 0,
                        titulo: "",
                        texto: "",
                        usu_id: ""
                    }  

                    var noticiaC = {
                        id: parseInt(noticia.id),
                        titulo: noticia.titulo,
                        texto: noticia.texto,
                        usuid: result.retornoBD[0].usu_id
                    }          

                    result = "";
                        
                    result = await notModel.atualizar(noticiaC.titulo, noticiaC.texto, noticiaC.usuid, noticiaC.id);

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
                            msg: "Você não tem permissão para atualizar notícias.",
                            retorno: false
                        })
                }
            }else{                           
                return res
                    .status(400)
                    .json({ 
                        msg: "Já existe notícia cadastrada com esse título.",
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
//DELETE rota => /noticias/:id
//apaga uma noticia
exports.apagar = async (req, res, next) => {
    try {
        
        var noticia = {
            id:"",
            titulo:"",
            texto:"",
            email:"",
            perfil:""
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

        noticia = {
            id: req.params.id,
            titulo: "teste",
            texto: "testeeee",
            email: req.headers.email,
            perfil: perfil
        }
        
        result = val.noticia(noticia.titulo, noticia.texto, noticia.email, noticia.perfil);

        if (result.retorno) {

            resul = "";

            result = await notModel.obterNoticiaPorId(noticia.id);
            
            if (result.retorno) {

                noticia = {
                    id: result.retornoBD[0].not_id,
                    imagem: result.retornoBD[0].not_imagem
                }

                var img = noticia.imagem;
                img = img.split('/files/');

                result = val.apagaImagem(img[1]);

                result = "";
                
                result = await notModel.apagar(noticia.id);

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
//PATCH rota => /noticias
//atualiza a situação de destaque das notícias elencadas na requisição
exports.destacar = async (req, res, next) => {
    try {

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

        var noticia = {
            titulo: "teste",
            texto: "testeeee",
            email: req.body.email,
            perfil: perfil,
            noticias: req.body.noticias
        }
        
        result = val.noticia(noticia.titulo, noticia.texto, noticia.email, noticia.perfil);

        if (result.retorno) { 
            
            result = "";
            result = await usuModel.obterEmail(noticia.email);

            if (result.retorno) {
                var id = 0;
                var userId = result.retornoBD[0].usu_id;

                result = "";                        
                result = await notModel.obterNoticiasDestacadas(); 
    
                if(!result.retorno){
                    for (let i = 0; i < noticia.noticias.length; i++) {
                        id = parseInt(noticia.noticias[i].id);

                        result = "";                        
                        result = await notModel.atualizarAddDestaque(userId, id);    
                    }
    
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
                    var atual = result.retornoBD;

                    for (let i = 0; i < atual.length; i++){
                        id = parseInt(atual[i].not_id),
                        await notModel.atualizarRemoverDestaque(userId, id); 
                    }

                    for (let i = 0; i < noticia.noticias.length; i++) {
                        id = parseInt(noticia.noticias[i].id),
                        result = ""
                        result = await notModel.atualizarAddDestaque(userId, id);
                    }
                    
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