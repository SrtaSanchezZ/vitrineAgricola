const mysql = require('../services/mysql');

let result = "";
let retornoBD = "";
let sql = "";

async function obter() {
    try {
        sql = `SELECT * FROM grupos`
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

async function obterGrupoPorId(id) {
    try {
        sql = `SELECT * FROM grupos WHERE gru_id = ?`
        retornoBD = await mysql.execute(sql, [id]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "grupos com id " + id}
        }else{
            return { retorno: false, msg: "Não há grupos cadastrados com esse id."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há grupos cadastrados com esse id.", Erro: e }
    }
}
module.exports.obterGrupoPorId = obterGrupoPorId

async function obterGrupoPorNome(nome) {
    try {
        sql = `SELECT * FROM grupos WHERE gru_nome = ?`
        retornoBD = await mysql.execute(sql, [nome]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "grupos com nome " + nome}
        }else{
            return { retorno: false, msg: "Não há grupos cadastrados com esse nome."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há grupos cadastrados com esse nome.", Erro: e }
    }
}
module.exports.obterGrupoPorNome = obterGrupoPorNome

async function cadastrar(nome) {
    try {        
        sql = `INSERT INTO grupos (gru_nome) VALUES (?)`
        retornoBD = await mysql.execute(sql, [nome])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "grupo cadastrado com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível cadastrar esse grupo, revise os dados informados."}
        }
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível cadastrar esse grupo.", Erro: e }
    }
}
module.exports.cadastrar = cadastrar

async function atualizar(nome, id) {
    try {

        sql = `UPDATE grupos SET gru_nome = ? WHERE gru_id = ?`
        retornoBD = await mysql.execute(sql, [nome, id])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Grupo atualizado com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível atualizar esse grupo, revise os dados informados."}
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível atualizar esse grupo.", Erro: e }
    }
}
module.exports.atualizar = atualizar

async function apagar(id) {
    try {        
            sql = `DELETE FROM grupos WHERE gru_id = ?`;
            retornoBD = await mysql.execute(sql, [id])

            if(retornoBD.affectedRows > 0){
                return result = { retorno: true, msg: "Grupo apagado com sucesso!"}
            }else{
                return result = { retorno: false, msg: "Não foi possível apagadar esse grupo, tente novamente."}
            }
        
    } catch (e) {
        console.log(e)
        return result = { retorno: false, msg: "Não foi possível apagadar esse grupo.", Erro: e }
    }
}
module.exports.apagar = apagar