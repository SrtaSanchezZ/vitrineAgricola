const mysql = require('../services/mysql');

let result = "";
let retornoBD = "";
let sql = "";

async function obter() {
    try {
        sql = `SELECT * FROM itens_da_vitrine`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Relação de grupos."}
        }else{
            return result = { retorno: false, msg: "Não há grupos cadastrados." }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não há grupos cadastrados.", Erro: e }
    }
}
module.exports.obter = obter

async function obterItemPorId(id) {
    try {
        sql = `SELECT * FROM itens_da_vitrine WHERE itv_id = ?`
        retornoBD = await mysql.execute(sql, [id]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Items com id " + id}
        }else{
            return { retorno: false, msg: "Não há Items cadastrados com esse id."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há Items cadastrados com esse id.", Erro: e }
    }
}
module.exports.obterItemPorId = obterItemPorId

async function obterItemPorProdutoId(id) {
    try {
        sql = `SELECT * FROM itens_da_vitrine WHERE itv_pro_id = ?`
        retornoBD = await mysql.execute(sql, [id]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Items com id " + id}
        }else{
            return { retorno: false, msg: "Não há Items cadastrados com esse id."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há Items cadastrados com esse id.", Erro: e }
    }
}
module.exports.obterItemPorProdutoId = obterItemPorProdutoId

async function cadastrarItemVitrine(quantidade, valor, usuario, vitrine, produto) {
    try {        
        sql = `INSERT INTO itens_da_vitrine (itv_pro_qtd, itv_pro_val, itv_usu_id, itv_vit_id, itv_pro_id) VALUES (?,?,?,?,?)`
        retornoBD = await mysql.execute(sql, [quantidade, valor, usuario, vitrine, produto])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Item da Vitrine cadastrado com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível cadastrar esse Item da Vitrine, revise os dados informados."}
        }
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível cadastrar esse Item da Vitrine.", Erro: e }
    }
}
module.exports.cadastrarItemVitrine = cadastrarItemVitrine

async function atualizarItemVitrine(quantidade, id) {
    try {

        sql = `UPDATE itens_da_vitrine SET itv_pro_qtd = ? WHERE itv_id = ?`
        retornoBD = await mysql.execute(sql, [quantidade, id])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Item da Vitrine atualizado com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível atualizado este Item da Vitrine, revise os dados informados."}
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível atualizado este Item da Vitrine.", Erro: e }
    }
}
module.exports.atualizarItemVitrine = atualizarItemVitrine