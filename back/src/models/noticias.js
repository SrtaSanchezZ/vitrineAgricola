const mysql = require('../services/mysql');
const val = require('../services/utils');

let result = "";
let retornoBD = "";
let sql = "";

async function obter() {
    try {
        sql = `SELECT * FROM noticias`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Relação de noticias."}
        }else{
            return result = { retorno: false, msg: "Não há notícias cadastradas." }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não há notícias cadastradas.", Erro: e }
    }
}
module.exports.obter = obter

async function obterNoticiaPorId(id) {
    try {
        sql = `SELECT * FROM noticias WHERE not_id = ?`
        retornoBD = await mysql.execute(sql, [id]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Noticias com id " + id}
        }else{
            return { retorno: false, msg: "Não há notícias cadastradas com esse id."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há notícias cadastradas com esse id.", Erro: e }
    }
}
module.exports.obterNoticiaPorId = obterNoticiaPorId

async function obterNoticiaPorTitulo(titulo) {
    try {
        sql = `SELECT * FROM noticias WHERE not_titulo = ?`
        retornoBD = await mysql.execute(sql, [titulo]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Noticias com titulo " + titulo}
        }else{
            return { retorno: false, msg: "Não há notícias cadastradas com esse título."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há notícias cadastradas com esse título.", Erro: e }
    }
}
module.exports.obterNoticiaPorTitulo = obterNoticiaPorTitulo

async function obterNoticiasDestacadas() {
    try {
        sql = `SELECT * FROM noticias WHERE not_destaque = 1`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Noticias em destaque"}
        }else{
            return { retorno: false, msg: "Não há notícias em destaque."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há notícias em destaque.", Erro: e }
    }
}
module.exports.obterNoticiasDestacadas = obterNoticiasDestacadas

async function cadastrar(titulo, texto, id, imagem, destaque) {
    try {        
        var data = new Date();

        sql = `INSERT INTO noticias (not_titulo, not_texto, not_data, not_destaque, not_usu_id, not_imagem) VALUES (?,?,?,?,?,?)`
        retornoBD = await mysql.execute(sql, [titulo, texto, data, destaque, id, imagem])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Noticia cadastrada com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível cadastrar essa notícia, revise os dados informados."}
        }
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível cadastrar essa notícia.", Erro: e }
    }
}
module.exports.cadastrar = cadastrar

async function atualizar(titulo, texto, usuid, id) {
    try {

        var data = new Date();

        sql = `UPDATE noticias SET not_titulo = ?, not_texto = ?, not_data = ?, not_usu_id = ? WHERE not_id = ?`
        retornoBD = await mysql.execute(sql, [titulo, texto, data, usuid, id])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Noticia Atualizada com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível atualizar essa notícia, revise os dados informados."}
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível atualizar essa notícia.", Erro: e }
    }
}
module.exports.atualizar = atualizar

async function atualizarRemoverDestaque(usuid, id) {
    try {

        var data = new Date();

        sql = `UPDATE noticias SET not_data = ?, not_usu_id = ?, not_destaque = ? WHERE not_id = ?`
        retornoBD = await mysql.execute(sql, [data, usuid, 0, id])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Removido o Destaque da Noticia com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível remover o destaque desta notícia, revise os dados informados."}
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível remover o destaque desta notícia.", Erro: e }
    }
}
module.exports.atualizarRemoverDestaque = atualizarRemoverDestaque

async function atualizarAddDestaque(usuid, id) {
    try {

        var data = new Date();

        sql = `UPDATE noticias SET not_data = ?, not_usu_id = ?, not_destaque = ? WHERE not_id = ?`
        retornoBD = await mysql.execute(sql, [data, usuid, 1, id])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Noticia Destacada com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível destacar desta notícia, revise os dados informados."}
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível destacar desta notícia.", Erro: e }
    }
}
module.exports.atualizarAddDestaque = atualizarAddDestaque

async function apagar(id) {
    try {      
            sql = `DELETE FROM noticias WHERE not_id = ?`;
            retornoBD = await mysql.execute(sql, [id])

            if(retornoBD.affectedRows > 0){
                return result = { retorno: true, msg: "Noticia apagada com sucesso!"}
            }else{
                return result = { retorno: false, msg: "Não foi possível apagadar essa notícia, tente novamente."}
            }
        
    } catch (e) {
        console.log(e)
        return result = { retorno: false, msg: "Não foi possível apagada essa notícia.", Erro: e }
    }
}
module.exports.apagar = apagar