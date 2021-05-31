const { format } = require('morgan');
const notModel = require('../models/noticias');
const usuModel = require('../models/usuarios');
const val = require('../service/validacao');

var result = "";

//GET rota => /noticias
//retorna todas as noticias
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
exports.cadastro = async (req, res, next) => {
    try {
        var imagem = "";
        result = val.noticia(req.body.titulo, req.body.texto, req.body.email, req.body.perfil);
        
        if(result.retorno){      
            
            var titulo = req.body.titulo;
            
            result = await notModel.obterNoticiaPorTitulo(titulo);

            if(!result.retorno){

                var email = req.body.email;

                result = await usuModel.obterEmail(email);
                if(result.retorno){

                    var id = result.retornoBD[0].usu_id;
                    imagem = req.files;

                    if(imagem.path !== undefined){
                        
                        result = await notModel.cadastrar(titulo, req.body.texto, imagem, id);

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
                        result = await notModel.cadastrar(titulo, req.body.texto, imagem, id);

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

//PUT rota => /noticia/:id
//atualiza uma noticia
exports.atualizar = async (req, res, next) => {
    try {
        result = val.noticia(req.body.titulo, req.body.texto, req.body.email, req.body.perfil);
        
        if(result.retorno){      
            
            var titulo = req.body.titulo;
            
            result = await notModel.obterNoticiaPorTitulo(titulo);

            if(!result.retorno){
                
                var email = req.body.email;

                result = await usuModel.obterEmail(email);

                if(result.retorno){

                    var idusu = result.retornoBD[0].usu_id;

                    var noticia = {
                        id: req.params.id,
                        titulo: req.body.titulo,
                        texto: req.body.texto,
                        idusu: id, 
                        destaque: req.body.destaque
                    }
    
                    result = await notModel.atualizar(noticia.id, noticia.titulo, noticia.texto, noticia.idusu, noticia.destaque);

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