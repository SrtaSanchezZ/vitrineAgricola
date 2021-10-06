const curModel = require('../models/cursos');
const val = require('../services/utils');

var result = "";

//GET rota => /cursos/nivel
//obtem todos os níveis
exports.obterNivel = async (req, res, next) => {
    try {

        result = await curModel.obterNivel();

        if (result.retorno) {

            response = {
                nivel: result.retornoBD.map(niv => {
                    return{        
                        id: niv.niv_id,
                        nome: niv.niv_nome,                
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
//GET rota => /cursos/area
//obtem todos as áreas
exports.obterArea = async (req, res, next) => {
    try {

        result = await curModel.obterArea();

        if (result.retorno) {

            response = {
                area: result.retornoBD.map(are => {
                    return{        
                        id: are.are_id,
                        nome: are.are_nome,                
                        nivel: are.are_nivel,                
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
//GET rota => /cursos
//obtem todos as cursos
exports.obterCurso = async (req, res, next) => {
    try {

        result = await curModel.obterCursos();

        if (result.retorno) {

            response = {
                cursos: result.retornoBD.map(cur => {
                    return{        
                        id: cur.cur_id,
                        nome: cur.cur_nome,                
                        coordernado: cur.cur_coordernador,                
                        email: cur.cur_email,                
                        eixo: cur.cur_eixo,                
                        obj: cur.cur_obj,                
                        principal: cur.cur_principal,                
                        mercado: cur.cur_mercado,                
                        mod1: cur.cur_mod1,                
                        mod2: cur.cur_mod2,                
                        mod3: cur.cur_mod3,                
                        mod4: cur.cur_mod4,                
                        duracao: cur.cur_duracao,                
                        img: cur.cur_img,                
                        area: cur.cur_area,                
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