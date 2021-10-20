const vitModel = require('../models/vitrine');
const usuModel = require('../models/usuarios');
const val = require('../services/utils');

var result = "";

//GET rota => /vitrine
//obtem todos os itens da vitrine
exports.obter = async (req, res, next) => {
    try {

        result = await vitModel.obter();

        if (result.retorno) {

            response = {
                vitrine: result.retornoBD.map(vit => {
                    return{        
                        id: vit.vit_id,
                        produtoId: vit.vit_pro_id,
                        produtoNome: vit.pro_nome,
                        produtoDescricao: vit.pro_descricao,
                        produtoMetrica: vit.pro_metrica,
                        produtoImg: vit.pro_imagem,
                        produtoGrupo: vit.pro_grupo,
                        quantidade: vit.vit_pro_qtd,
                        valor: vit.vit_pro_val,                 
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
//POST rota => /vitrine
//cadastra ou atualiza itens da vitrine
exports.cadastrar = async (req, res, next) => {
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

        var vitrine = {
            email: req.body.email,
            perfil: perfil,
            itens: req.body.itens
        }
        
        result = val.grupo("validador", vitrine.email, vitrine.perfil);

        if (result.retorno) {             
            result = "";
            result = await usuModel.obterEmail(vitrine.email);

            if (result.retorno) {
                var userId = result.retornoBD[0].usu_id; 
                var id = parseInt(vitrine.itens.id);
                var qtd = parseInt(vitrine.itens.qtd);
                var valor = parseFloat(vitrine.itens.valor);

                result = "";                        
                result = await vitModel.obterItemPorProdutoId(id);

                if(result.retorno){
                    result = "";                        
                    result = await vitModel.atualizarItemVitrine(id, qtd, valor, userId);

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
                    result = "";                        
                    result = await vitModel.cadastrarItemVitrine(id, qtd, valor, userId);   

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