const mysql = require('../services/mysql');

let result = "";
let retornoBD = "";
let sql = "";

async function obter() {
    try {
        sql = `SELECT * FROM produtos`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Relação de produtos."}
        }else{
            return result = { retorno: false, msg: "Não há produtos cadastrados." }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não há produtos cadastrados.", Erro: e }
    }
}
module.exports.obter = obter

async function obterProdutoPorId(id) {
    try {
        sql = `SELECT * FROM produtos WHERE pro_id = ?`
        retornoBD = await mysql.execute(sql, [id]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Produtos com id " + id}
        }else{
            return { retorno: false, msg: "Não há produtos cadastrados com esse id."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há produtos cadastrados com esse id.", Erro: e }
    }
}
module.exports.obterProdutoPorId = obterProdutoPorId

async function obterProdutoPorGrupoId(id) {
    try {
        sql = `SELECT * FROM produtos WHERE pro_grupo = ?`
        retornoBD = await mysql.execute(sql, [id]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Produtos do grupo com id " + id}
        }else{
            return { retorno: false, msg: "Não há produtos cadastrados com esse id de grupo."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há produtos cadastrados com esse id de grupo.", Erro: e }
    }
}
module.exports.obterProdutoPorGrupoId = obterProdutoPorGrupoId

async function obterProdutoPorNome(nome) {
    try {
        sql = `SELECT * FROM produtos WHERE pro_nome = ?`
        retornoBD = await mysql.execute(sql, [nome]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Produtos com nome " + nome}
        }else{
            return { retorno: false, msg: "Não há produtos cadastrados com esse nome."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há produtos cadastrados com esse nome.", Erro: e }
    }
}
module.exports.obterProdutoPorNome = obterProdutoPorNome

async function cadastrar(nome, descricao, grupo, metrica, imagem) {
    try {        
        sql = `INSERT INTO produtos (pro_nome, pro_descricao, pro_grupo, pro_metrica, pro_imagem) VALUES (?,?,?,?,?)`
        retornoBD = await mysql.execute(sql, [nome, descricao, grupo, metrica, imagem])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Produto cadastrado com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível cadastrar esse produto, revise os dados informados."}
        }
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível cadastrar esse produto.", Erro: e }
    }
}
module.exports.cadastrar = cadastrar

async function atualizar(nome, descricao, grupo, metrica, id) {
    try {

        sql = `UPDATE produtos SET pro_nome = ?, pro_descricao = ?, pro_grupo = ?, pro_metrica = ? WHERE pro_id = ?`
        retornoBD = await mysql.execute(sql, [nome, descricao, grupo, metrica, id])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Produto atualizado com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível atualizar esse produto, revise os dados informados."}
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível atualizar esse produto.", Erro: e }
    }
}
module.exports.atualizar = atualizar

async function apagar(id) {
    try {        
            sql = `DELETE FROM produtos WHERE pro_id = ?`;
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