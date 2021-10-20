const mysql = require('../services/mysql');

let result = "";
let retornoBD = "";
let sql = "";

async function obter() {
    try {
        sql = `SELECT r.res_id, r.res_data, r.res_cliente, r.res_contato,
                      r.res_total, s.str_data, s.str_situacao, s.str_usu_id
               FROM reservas r
               LEFT JOIN situacao_reserva AS s
               ON s.str_res_id = r.res_id
               WHERE res_total > 0`
        retornoBD = await mysql.execute(sql);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Relação de itens da reserva."}
        }else{
            return result = { retorno: false, msg: "Não há itens na reserva." }
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não há itens na reserva.", Erro: e }
    }
}
module.exports.obter = obter

async function obterItemReservaPorReservaId(id) {
    try {
        sql = `SELECT i.itr_pro_qtd, i.itr_pro_valor, i.itr_pro_id, 
        p.pro_metrica, p.pro_imagem, p.pro_grupo, p.pro_nome, p.pro_descricao
        FROM itens_da_reserva i
        LEFT JOIN produtos AS p
        ON i.itr_pro_id = p.pro_id
        WHERE itr_res_id = ?`
        retornoBD = await mysql.execute(sql, [id]);

        if(retornoBD.length > 0){
            return result = { retornoBD, retorno: true, msg: "Itens da Reserva" }
        }else{
            return { retorno: false, msg: "Não há itens cadastrados com esse id de Reserva."}
        }
        
    } catch (e) {
        console.log(e)
        return { retorno: false, msg: "Não há itens cadastrados com esse id de Reserva.", Erro: e }
    }
}
module.exports.obterItemReservaPorReservaId = obterItemReservaPorReservaId

async function cadastrarReserva(cliente, contato, total) {
    try {   
        var data = new Date();

        sql = `INSERT INTO reservas (res_cliente, res_contato, res_total, res_data) VALUES (?,?,?,?)`
        retornoBD = await mysql.execute(sql, [cliente, contato, total, data])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Reserva cadastrada com sucesso!", retornoBD}
        }else{
            return result = { retorno: false, msg: "Não foi possível cadastrar essa Reserva, revise os dados informados."}
        }
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível cadastrar essa Reserva.", Erro: e }
    }
}
module.exports.cadastrarReserva = cadastrarReserva

async function cadastrarSituacaoReserva(id, situacao) {
    try {   
        var data = new Date();

        sql = `INSERT INTO situacao_reserva (str_res_id, str_situacao, str_data) VALUES (?,?,?)`
        retornoBD = await mysql.execute(sql, [id, situacao, data])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Situação da Reserva cadastrada com sucesso!", retornoBD}
        }else{
            return result = { retorno: false, msg: "Não foi possível cadastrar essa Situação da Reserva, revise os dados informados."}
        }
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível cadastrar essa Situação da Reserva.", Erro: e }
    }
}
module.exports.cadastrarSituacaoReserva = cadastrarSituacaoReserva

async function cadastrarItemReserva(id, proId, proQtd, proValor) {
    try {   

        sql = `INSERT INTO itens_da_reserva (itr_res_id, itr_pro_id, itr_pro_qtd, itr_pro_valor) VALUES (?,?,?,?)`
        retornoBD = await mysql.execute(sql, [id, proId, proQtd, proValor])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Item da Reserva cadastrado com sucesso!", retornoBD}
        }else{
            return result = { retorno: false, msg: "Não foi possível cadastrar esse Item da Reserva, revise os dados informados."}
        }
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível cadastrar esse Item da Reserva.", Erro: e }
    }
}
module.exports.cadastrarItemReserva = cadastrarItemReserva

async function atualizarSituacaoReserva(id, situacao, usuId) {
    try {
        var data = new Date();

        sql = `UPDATE situacao_reserva SET str_situacao = ?, str_data = ?, str_usu_id = ? WHERE str_res_id = ?`
        retornoBD = await mysql.execute(sql, [situacao, data, usuId, id])

        if(retornoBD.affectedRows > 0){
            return result = { retorno: true, msg: "Situação da Reserva atualizado com sucesso!"}
        }else{
            return result = { retorno: false, msg: "Não foi possível atualizado esta Situação da Reserva, revise os dados informados."}
        }
        
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível atualizado esta Situação da Reserva.", Erro: e }
    }
}
module.exports.atualizarSituacaoReserva = atualizarSituacaoReserva