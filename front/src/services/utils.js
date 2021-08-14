let result = "";
let rgxEmail = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

function usuario(nome, email, senha, perfil) {
    if (nome.length < 81 && nome.length > 3) {
        if(email.length < 81 && email.length > 5 && rgxEmail.test(email)){
            if(senha.length > 0 && senha.length < 9){
                if(parseInt(perfil) > 0 && parseInt(perfil) < 4){
                    result = { msg: "Usuário validado com sucesso!", retorno: true }                    
                }else{
                    result = { msg: "Perfil inválido", retorno: false }                    
                }
            }else{
                result = { msg: "Senha inválida", retorno: false }
            }
        }else{
            result = { msg: "E-mail inválido", retorno: false }
        }
    }else{
        result = { msg: "Nome inválido", retorno: false }
    }

    return result
}
module.exports.usuario = usuario

function noticia(titulo, texto, email, perfil) {
    if(titulo.length > 0 && titulo.length < 80){
        if(texto.length > 0 && texto.length < 2000){
            if(email.length < 81 && email.length > 5 && rgxEmail.test(email)){
                if(perfil == 1 || perfil == 2){
                    result = { msg: "Dados validados com sucesso!", retorno: true } 
                }else{
                    result = { msg: "Você não possui permissão para interagir com Notícias.", retorno: false }                    
                } 
            }else{
                result = { msg: "E-mail inválido", retorno: false }                    
            }                  
        }else{
            result = { msg: "Texto inválido", retorno: false }                    
        }
    }else{
        result = { msg: "Titulo inválido", retorno: false }
    }

    return result
}
module.exports.noticia = noticia

function produto(nome, descricao, grupo, email, perfil) {
    if(nome.length > 0 && nome.length < 80){
        if(descricao.length > 0 && descricao.length < 200){
            if(email.length < 81 && email.length > 5 && rgxEmail.test(email)){
                if(perfil == 1 || perfil == 3){
                    if(grupo.length > 0 && grupo.length < 200){                           
                        result = { msg: "Dados validados com sucesso!", retorno: true }
                    }else{
                        result = { msg: "Todos produtos deve ser vinculado a um grupo padrão.", retorno: false } 
                    }
                }else{
                    result = { msg: "Você não possui permissão para interagir com Produtos.", retorno: false }                    
                } 
            }else{
                result = { msg: "E-mail inválido", retorno: false }                    
            }                  
        }else{
            result = { msg: "Descrição inválido", retorno: false }                    
        }
    }else{
        result = { msg: "Nome inválido", retorno: false }
    }

    return result
}
module.exports.produto = produto

function email(email) {
    if(email.length < 81 && email.length > 5 && rgxEmail.test(email)){
        result = { msg: "E-mail validado com sucesso!", retorno: true }
    }else{
        result = { msg: "E-mail inválido", retorno: false }
    }

    return result
}
module.exports.email = email

function reSenha(senha, token) {
    if(senha.length > 0 && senha.length < 9){
        if(token.length > 0 && token.length < 500){
            result = { msg: "Usuário validado com sucesso!", retorno: true }                    
        }else{
            result = { msg: "Token inválido", retorno: false }                    
        }
    }else{
        result = { msg: "Senha inválida", retorno: false }
    }

    return result
}
module.exports.reSenha = reSenha

function apagaImagem(valor) {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', 'uploads', valor));
}
module.exports.apagaImagem = apagaImagem

function formataString(valor) {

    return valor.normalize("NFD")
        .replace(/[^a-zA-Zs]/g, "")
        .toLowerCase();
}
module.exports.formataString = formataString

function getRandom(id) {
    var max = 100000
    return Math.floor(Math.random() * max + id)
}
module.exports.getRandom = getRandom

function remover_acentos_espaco(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
module.exports.remover_acentos_espaco = remover_acentos_espaco
