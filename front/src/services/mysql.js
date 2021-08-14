const mysql = require('mysql');

var conexao = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT,
});

conexao.getConnection((erro) => {
    if (erro) {
        console.log('Erro ao conectar com o banco de dados...', erro)
        return
    }
    console.log('Conexão realizada com sucesso!');
})

exports.execute = (sql, parametros = []) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, parametros, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    })
}

exports.conexao = conexao;