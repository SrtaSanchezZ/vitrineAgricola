let valida = "";
let result = "";
let rgxEmail = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;

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

function noticia(titulo, texto, email, perfil) {
    if(titulo.length > 0 && titulo.length < 80){
        if(texto.length > 0 && texto.length < 2000){
            if(email.length < 81 && email.length > 5 && rgxEmail.test(email)){
                if(perfil == "master" || perfil == "redator"){
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
