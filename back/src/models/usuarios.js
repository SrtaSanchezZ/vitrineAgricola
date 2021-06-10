const mysql = require('../mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const val = require('../services/validacao')

let result = "";
let retornoBD = "";
let sql = "";

async function obter() {
    try {
        sql = `SELECT * FROM usuarios`
        retornoBD = await mysql.execute(sql);

        return result = { retornoBD, retorno: true, msg: "Relação de usuários."}
    } catch (e) {
        return result = { retorno: false, msg: "Não há usuários cadastrados.", Erro: e }
    }
}
module.exports.obter = obter

async function obterEmail(email) {

    result = val.email(email);

    if(result.retorno){
        try {
            sql = `SELECT * FROM usuarios WHERE usu_email = ?`
            retornoBD = await mysql.execute(sql, [email]);

            if(retornoBD.length > 0){
                return result = { retornoBD, retorno: true, msg: "Usuário."}
            }else{
                return result = { retorno: false, msg: "Não há usuário cadastrado com esse e-mail."}
            }            
        } catch (e) {
            return result = { retorno: false, msg: "Não há usuário cadastrado com esse e-mail.", Erro: e }
        }
    }else{
        return result = { retorno: false, msg: "Não há usuário cadastrado com esse e-mail."}
    }
}
module.exports.obterEmail = obterEmail

async function duplicado(email) {
    try {

        result = val.email(email);

        if(result.retorno){
            sql = `SELECT * FROM usuarios WHERE usu_email = ?`
            retornoBD = await mysql.execute(sql, [email]);

            var dados = retornoBD;

            if(dados.length === 0){
                return result = { retorno: false, msg: "Este e-mail ainda não possui cadastro."}
            }else{
                return result = { retorno: true, msg: "Este e-mail já possui cadastro."}
            }    
        }else{    
            return result = { retorno: result.retorno, msg: result.msg}
        }
    } catch (e) {
        return result = { retorno: false, msg: "Erro para carregar dados, valide sua conexão com a internet.", Erro: e }
    }
}
module.exports.duplicado = duplicado

async function cadastrar(usuario) {
    try {

        result = val.usuario(usuario.nome, usuario.email, usuario.senha, usuario.perfil);

        if(result.retorno){

            bcrypt.hash(usuario.senha, 10, async (errBcrypt, hash) =>{
                if(errBcrypt){
                    return result = { retorno: false, msg: "Não foi possível cadastrar esse usuário, revise a senha." }
                }else{

                    sql = `INSERT INTO usuarios (usu_nome, usu_email, usu_senha, usu_perfil) VALUES (?,?,?,?)`;        
                    retornoBD = await mysql.execute(sql, [usuario.nome, usuario.email, hash, usuario.perfil]);

                    if(retornoBD.affectedRows > 0){
                        result = { retorno: true, msg: "Usuário Cadastrado com sucesso!"}
                    }else{
                        result = { retorno: false, msg: "Não foi possível cadastrar esse usuário, revise os dados informados."}
                    }
        
                } 
            });

            return result;

        }else{            
            return result = { retorno: result.retorno, msg: result.msg}
        }
    } catch (e) {
        return result = { retorno: false, msg: "Não foi possível cadastrar esse usuário, revise os dados.", Erro: e }
    }
}
module.exports.cadastrar = cadastrar

async function alterarToken(email) {

    result = val.email(email);

    if(result.retorno){
        try {

            const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '30m' });

            sql = `UPDATE usuarios SET usu_token = ? WHERE usu_email = ?`
            retornoBD = await mysql.execute(sql, [token, email]);

            if(retornoBD.affectedRows > 0){
                return result = { retorno: true, msg: "Token Atualizado", token: token}
            }else{
                return result = { retorno: false, msg: "Não foi possível validar esse e-mail, revise e tente novamente."}
            }
        } catch (e) {
            return result = { retorno: false, msg: "Não há usuário cadastrado com esse e-mail.", Erro: e }
        }
    }else{
        return result = { retorno: result.retorno, msg: result.msg}
    }
}
module.exports.alterarToken = alterarToken

async function emailResenha(email, token) {

    result = await obterEmail(email);

    if(result.retorno){
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'talita.b.sanchez@gmail.com',
                pass: 'Tbynh@m0on'
            }
        });

        var mailOptions = {
            from: 'talita.b.sanchez@gmail.com',
            to: email,
            subject: 'Redefinição de senha',
            html: `<span style="font-family: 'Courier New', Courier; font-size: 14px; background:#000000;">
                <a href='http://localhost:3000/novasenha/${token}' name="token" style="font-size: 18px; color:#ffffff; text-decoration: none; cursor: pointer;" target="_blank">
                    RESETAR SENHA
                </a>
            </span>`
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("ERRO = " + error);
                result = { retorno: false, msg: "Não foi possível enviar o e-mail."}
            } else {
                console.log("OK = " + info);
                result = { retorno: true, msg: "E-mail enviado com sucesso!"}
            }
        })

        return result = { retorno: true, msg: "E-mail enviado com sucesso!"};
    }else{
        result = { retorno: false, msg: "Não foi possível enviar o e-mail."}
    }
}
module.exports.emailResenha = emailResenha

async function obterToken(email) {

    result = await val.email(email);

    if(result.retorno){
        try {
            sql = `SELECT usu_token FROM usuarios WHERE usu_email = ?`
            retornoBD = await mysql.execute(sql, [email]);

            if (retornoBD.length > 0) {
                return result = {retornoBD, retorno: true, msg: "Token"}
            }else {
                return result = { retorno: false, msg: "Não há token para esse usuário."}
            }
        } catch (e) {
            return result = { retorno: false, msg: "Não há usuário cadastrado com esse e-mail.", Erro: e }
        }
    }else{
        return result = { retorno: result.retorno, msg: result.msg}
    }
}
module.exports.obterToken = obterToken

async function Resenha(senha, email) {
    try{    
        bcrypt.hash(senha, 10, async (errBcrypt, hash) => {

            if (errBcrypt) { 
                return result = { retorno: false, msg: "Token invalido ou expirado."} 
            }else{   
                sql = `UPDATE usuarios SET usu_senha = ? WHERE usu_email = ?`
                retornoBD = await mysql.execute(sql, [hash, email]);

                if (retornoBD.affectedRows > 0) {
                    result = { retorno: true, msg: "Senha atualizada com sucesso!"}
                }else {
                    result = { retorno: false, msg: "Não foi possível atualizar a sua senha."}
                }
            }
        });
        
        return result
                
    }catch{
        return result = { retorno: false, msg: "Token invalido ou expirado."}
    }
}
module.exports.Resenha = Resenha

async function deletar(id) {
    try {        
            sql = `DELETE FROM usuarios WHERE usu_id = ?`;
            retornoBD = await mysql.execute(sql, [id])
        
            return result = { retorno: true, msg: "Usuário apagado com sucesso!"}
        
    } catch (e) {
        console.log(e)
        return result = { retorno: false, msg: "Não foi possível apagar esse usuário.", Erro: e }
    }
}
module.exports.deletar = deletar