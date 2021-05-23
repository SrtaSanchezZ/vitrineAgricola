const usuModel = require('../models/usuarios')

//GET rota => /usuarios
//retorna todos os usuários
exports.todosUsuarios = async (req, res, next) => {
    try {

        const resultado = await usuModel.obterUsuarios();

        if (resultado.length == 0) {
            return res.status(404).json({
                mensagem: "Não há usuários cadastrados."
            })
        }

        const response = {
            id: resultado[0].usu_id,
            nome: resultado[0].usu_nome,
            email: resultado[0].usu_email,
            senha: resultado[0].usu_senha,
            perfil: resultado[0].usu_perfil
        }
        return res.status(200).json({ response })
    }
    catch (e) {
        console.log(e)
        return res.status(400).json({ mensagem: "Falha de conexão, revise seu acesso a internet.", Erro: e })
    }
}