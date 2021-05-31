const mysql = require('../mysql');
const val = require('../service/validacao');

let result = "";
let retornoBD = "";
let sql = "";

async function obter() {
    try {
        sql = `SELECT * FROM noticias`
        retornoBD = await mysql.execute(sql);

        return result = { retornoBD, retorno: true, msg: "Relação de noticias."}
    } catch (e) {
        return result = { retorno: false, msg: "Não há notícias cadastradas.", Erro: e }
    }
}
module.exports.obter = obter

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

async function cadastrar(titulo, texto, imagem, id) {
    try {        

        var data = new Date();

        if(imagem !== undefined || imagem != ""){

            sql = `INSERT INTO noticias (not_titulo, not_texto, not_data, not_destaque, not_usu_id) VALUES (?,?,?,?,?)`
            retornoBD = await mysql.execute(sql, [titulo, texto, data, 0, id])
    
            if(retornoBD.affectedRows > 0){
                result = { retorno: true, msg: "Noticia cadastrada com sucesso!"}
            }else{
                result = { retorno: false, msg: "Não foi possível cadastrar essa notícia, revise os dados informados."}
            }

            return result

        }else{

            sql = `INSERT INTO noticias (not_titulo, not_texto, not_data, not_destaque, not_usu_id) VALUES (?,?,?,?,?)`
            retornoBD = await mysql.execute(sql, [titulo, texto, data, 0, id])
    
            if(retornoBD.affectedRows > 0){
                result = { retorno: true, msg: "Noticia cadastrada com sucesso!"}
            }else{
                result = { retorno: false, msg: "Não foi possível cadastrar essa notícia, revise os dados informados."}
            }

            return result
        }
    } catch (e) {
        console.log(e)
        return result = { retorno: false, msg: "Não foi possível cadastrar essa notícia.", Erro: e }
    }
}
module.exports.cadastrar = cadastrar

async function atualizar(id, titulo, texto, idusu, destaque) {
    try {        

        var data = new Date();

            sql = `UPDATE noticias SET not_titulo = ?, not_texto = ?, not_data = ?, not_usu_id = ?, not_destaque = ?
                   WHERE not_id = ?`
            retornoBD = await mysql.execute(sql, [titulo, texto, data, idusu, destaque, id])
    
            if(retornoBD.affectedRows > 0){
                result = { retorno: true, msg: "Noticia Atualizada com sucesso!"}
            }else{
                result = { retorno: false, msg: "Não foi possível atualizar essa notícia, revise os dados informados."}
            }

            return result
        
    } catch (e) {
        console.log(e)
        return result = { retorno: false, msg: "Não foi possível cadastrar essa notícia.", Erro: e }
    }
}
module.exports.atualizar = atualizar