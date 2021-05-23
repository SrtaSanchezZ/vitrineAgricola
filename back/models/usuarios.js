const mysql = require('../mysql')

function obterUsuarios() {
    try {
        const select = `SELECT u.usu_id, u.usu_nome, u.usu_email, u.usu_senha, u.usu_perfil
                    FROM usuarios AS u`
        const result = mysql.execute(select);
        return result
    } catch (e) {
        console.log(e)
        return { mensagem: "Não há usuários cadastrados.", Erro: e }
    }
}
module.exports.obterUsuarios = obterUsuarios