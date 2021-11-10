const mysql = require('../services/mysql');

let result = "";
let retornoBD = "";
let sql = "";

async function obter() {
    try {
        sql = `SELECT v.vit_pro_id, p.pro_nome, p.pro_descricao, p.pro_metrica,
                p.pro_imagem, p.pro_grupo, v.vit_pro_qtd, v.vit_pro_val
               FROM produtos p
               LEFT JOIN vitrine AS v 
               ON v.vit_pro_id = p.pro_id
               WHERE v.vit_pro_qtd > 0`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Relação de itens da vitrine."}
        }else{
            return result = { retorno: false, msg: "Não há itens na vitrine." }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não há itens na vitrine.", Erro: e }
    }
}
module.exports.obter = obter

async function obterGrupo() {
    try {
        sql = `SELECT DISTINCT g.gru_id, g.gru_nome
               FROM grupos g 
               INNER JOIN 
                produtos p ON g.gru_id = p.pro_grupo
               INNER JOIN 
                vitrine v ON v.vit_pro_id = p.pro_id`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Relação de grupo da vitrine."}
        }else{
            return result = { retorno: false, msg: "Não há grupo na vitrine." }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não há grupo na vitrine.", Erro: e }
    }
}
module.exports.obterGrupo = obterGrupo

async function obterVitrineGrupo(id) {
    try {
        sql = `SELECT DISTINCT v.vit_pro_id, p.pro_nome, p.pro_descricao, p.pro_metrica,
                               p.pro_imagem, p.pro_grupo, v.vit_pro_qtd, v.vit_pro_val
               FROM grupos g 
               INNER JOIN 
                produtos p ON g.gru_id = p.pro_grupo
               INNER JOIN 
                vitrine v ON v.vit_pro_id = p.pro_id
               WHERE v.vit_pro_qtd > 0
               AND p.pro_grupo = ?`
        retornoBD = await mysql.execute(sql, id);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Relação de itens por grupo da vitrine."}
        }else{
            return result = { retorno: false, msg: "Não há itens por esse grupo na vitrine." }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não há itens por esse grupo na vitrine.", Erro: e }
    }
}
module.exports.obterVitrineGrupo = obterVitrineGrupo

async function obterItemPorProdutoId(produto) {
    try {
        sql = `SELECT * FROM vitrine WHERE vit_pro_id = ?`
        retornoBD = await mysql.execute(sql, [produto]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Item da Vitrine" }
        }else{
            return { retorno: false, msg: "Não há itens cadastrados com esse id."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há itens cadastrados com esse id.", Erro: e }
    }
}
module.exports.obterItemPorProdutoId = obterItemPorProdutoId

async function cadastrarItemVitrine(produto, quantidade, valor, usuario) {
    try {   
        var data = new Date();

        sql = `INSERT INTO vitrine (vit_pro_id, vit_pro_qtd, vit_pro_val, vit_usu_id, vit_data) VALUES (?,?,?,?,?)`
        retornoBD = await mysql.execute(sql, [produto, quantidade, valor, usuario, data])

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

async function atualizarItemVitrine(produto, quantidade, valor, usuario) {
    try {

        sql = `UPDATE vitrine SET vit_pro_qtd = ?, vit_pro_val = ?, vit_usu_id = ? WHERE vit_pro_id = ?`
        retornoBD = await mysql.execute(sql, [quantidade, valor, usuario, produto])

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

async function reservaItemVitrine(produto, quantidade) {
    try {

        result = await obterItemPorProdutoId(produto);

        if(result.retorno){            
            var qtd = result.retornoBD[0].vit_pro_qtd;
            qtd = qtd - quantidade;

            sql = `UPDATE vitrine SET vit_pro_qtd = ? WHERE vit_pro_id = ?`
            retornoBD = await mysql.execute(sql, [qtd, produto])

            if(retornoBD.affectedRows > 0){
                return result = { retorno: true, msg: "Item da Vitrine atualizado com sucesso!"}
            }else{
                return result = { retorno: false, msg: "Não foi possível atualizado este Item da Vitrine, revise os dados informados."}
            }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível atualizado este Item da Vitrine.", Erro: e }
    }
}
module.exports.reservaItemVitrine = reservaItemVitrine

async function cancelaReserva(produto, quantidade) {
    try {

        result = await obterItemPorProdutoId(produto);

        if(result.retorno){            
            var qtd = result.retornoBD[0].vit_pro_qtd;
            qtd = qtd + quantidade;

            sql = `UPDATE vitrine SET vit_pro_qtd = ? WHERE vit_pro_id = ?`
            retornoBD = await mysql.execute(sql, [qtd, produto])

            if(retornoBD.affectedRows > 0){
                return result = { retorno: true, msg: "Item da Vitrine atualizado com sucesso!"}
            }else{
                return result = { retorno: false, msg: "Não foi possível atualizado este Item da Vitrine, revise os dados informados."}
            }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível atualizado este Item da Vitrine.", Erro: e }
    }
}
module.exports.cancelaReserva = cancelaReserva

async function apagar(id) {
    try {        
            sql = `DELETE FROM vitrine WHERE vit_pro_id = ?`;
            retornoBD = await mysql.execute(sql, [id])

            if(retornoBD.affectedRows > 0){
                return result = { retorno: true, msg: "Produto excluido com sucesso!"}
            }else{
                return result = { retorno: false, msg: "Não foi possível excluir esse produto, tente novamente."}
            }
        
    } catch (e) {
        console.log(e)
        return result = { retorno: false, msg: "Não foi possível excluir esse produto.", Erro: e }
    }
}
module.exports.apagar = apagar