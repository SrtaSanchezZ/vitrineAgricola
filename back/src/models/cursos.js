const mysql = require('../services/mysql');

let result = "";
let retornoBD = "";
let sql = "";

async function obterNivel() {
    try {
        sql = `SELECT * FROM nivel`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Relação de nivel."}
        }else{
            return result = { retorno: false, msg: "Não há nivel cadastrados." }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não há nivel cadastrados.", Erro: e }
    }
}
module.exports.obterNivel = obterNivel

async function obterArea() {
    try {
        sql = `SELECT * FROM area_atuacao`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Areas cadastradas"}
        }else{
            return { retorno: false, msg: "Não há area cadastrada com esse id."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há area cadastrada com esse id.", Erro: e }
    }
}
module.exports.obterArea = obterArea

async function obterCursos() {
    try {
        sql = `SELECT * FROM cursos`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Cursos cadastrados"}
        }else{
            return { retorno: false, msg: "Não há cursos cadastrados."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há cursos cadastrados.", Erro: e }
    }
}
module.exports.obterCursos = obterCursos

async function obterCursoId(id) {
    try {
        sql = `SELECT * FROM cursos WHERE cur_id = ?`
        retornoBD = await mysql.execute(sql, id);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Curso cadastrado"}
        }else{
            return { retorno: false, msg: "Não há curso cadastrado com esse id."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há cursos cadastrados.", Erro: e }
    }
}
module.exports.obterCursoId = obterCursoId