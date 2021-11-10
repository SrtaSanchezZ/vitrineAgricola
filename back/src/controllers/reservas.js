const resModel = require('../models/reservas');
const usuModel = require('../models/usuarios');
const vitModel = require('../models/vitrine');
const val = require('../services/utils');

var result = "";

//GET rota => /reservas
//obtem todas as reservas e suas situações
exports.obter = async (req, res, next) => {
    try {

        result = await resModel.obter();

        if (result.retorno) {             

            response = {
                reservas: result.retornoBD.map(res => {
                    return{        
                        id: res.res_id,
                        data: res.res_data,
                        cliente: res.res_cliente,
                        contato: res.res_contato,
                        total: res.res_total,  
                        dataSituacao: res.str_data,                 
                        situacao: res.str_situacao,                 
                        usuario: res.str_usu_id,                 
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
//GET rota => /reservas/:id
//obtem todos os itens da reserva através do id
exports.obterPorId = async (req, res, next) => {
    try {

        const id = req.params.id;

        result = "";
        result = await resModel.obterItemReservaPorReservaId(id);  

        if (result.retorno) {             

            response = {
                itens: result.retornoBD.map(res => {
                    return{ 
                        produtoId: res.itr_pro_id,
                        produtoNome: res.pro_nome,
                        produtoDescricao: res.pro_descricao,
                        produtoMetrica: res.pro_metrica,
                        produtoImg: res.pro_imagem,
                        produtoGrupo: res.pro_grupo,
                        quantidade: res.itr_pro_qtd,
                        valor: res.itr_pro_valor
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
//POST rota => /reservas
//cadastra reserva, situação da reserva e itens da reserva
exports.cadastrar = async (req, res, next) => {
    try {
        var reservas = {    
            cliente: req.body.cliente,
            contato: req.body.contato,
            total: req.body.total,
            itens: req.body.itens               
        }
        var itens = [];
        itens = reservas.itens;

        result = "";
        result = await resModel.cadastrarReserva(reservas.cliente, reservas.contato, reservas.total);

        if (result.retorno) {
            
            var resId = result.retornoBD.insertId;
            var proId = "";
            var qtd = "";
            var valor = "";

            result = "";
            result = await resModel.cadastrarSituacaoReserva(resId, 1);

            if (result.retorno) {
                
                var i=0;

                while(i < itens.length){
                    proId = parseInt(itens[i].id);
                    qtd = parseInt(itens[i].qtd);
                    valor = parseFloat(itens[i].valor);

                    result = "";
                    result = await resModel.cadastrarItemReserva(resId, proId, qtd, valor);

                    if(result.retorno){
                        result = "";
                        result = await vitModel.reservaItemVitrine(proId, qtd);
                    }
                    
                    i++;
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
//PUT rota => /reservas/:id
//Atualiza situação da reserva
exports.AtualizarSituacao = async (req, res, next) => {
    try {

        var  perfil = req.body.perfil;
        
        if(perfil === "master"){
            perfil = 1;
        }
        if(perfil === "redator"){
            perfil = 2;
        }
        if(perfil === "vendedor"){
            perfil = 3;
        }
        
        var reserva = {    
            id: req.params.id,
            situacao: req.body.situacao,
            email: req.body.email,
            perfil: perfil             
        }

        result = "";
        result = val.grupo("validacao", reserva.email, reserva.perfil); 

        if (result.retorno) { 

            result = "";
            result = await usuModel.obterEmail(reserva.email);  

            if (result.retorno) {  

                var usuId = result.retornoBD[0].usu_id; 

                result = "";
                result = await resModel.atualizarSituacaoReserva( reserva.id,  reserva.situacao, usuId);    
            
                if (reserva.situacao === 3) {  

                    result = "";
                    result = await resModel.obterItemReservaPorReservaId(reserva.id); 

                    if (result.retorno) {             

                        const itens = result.retornoBD.map(res => {
                                return{ 
                                    produtoId: res.itr_pro_id,
                                    produtoNome: res.pro_nome,
                                    produtoDescricao: res.pro_descricao,
                                    produtoMetrica: res.pro_metrica,
                                    produtoImg: res.pro_imagem,
                                    produtoGrupo: res.pro_grupo,
                                    quantidade: res.itr_pro_qtd,
                                    valor: res.itr_pro_valor
                                }            
                            });

                        if(itens.length > 0){                                                        
                
                            var i=0;

                            while(i < itens.length){
                                proId = parseInt(itens[i].produtoId);
                                qtd = parseInt(itens[i].quantidade);

                                result = "";
                                result = await vitModel.cancelaReserva(proId, qtd);

                                i++;
                            }
            
                            return res
                                .status(200)
                                .json({ 
                                    msg: result.msg,
                                    retorno: true,
                                    response 
                                })
                        }           
                    }else{
                        return res
                            .status(400)
                            .json({ 
                                msg: "Não foi possível atualizar o estoque após o cancelamento da reserva.",
                                retorno: false
                            })
                    }
                }else{  
                    return res
                        .status(200)
                        .json({ 
                            msg: result.msg,
                            retorno: true,
                            response 
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