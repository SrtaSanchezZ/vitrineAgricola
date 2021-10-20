const routes = require("express").Router();
const resController = require('../controllers/reservas')

routes.get(
    '/reservas',
    resController.obter
)
routes.get(
    '/reservas/:id',
    resController.obterPorId
)
routes.post(
    '/reservas',
    resController.cadastrar
)
routes.put(
    '/reservas/:id',
    resController.AtualizarSituacao
)

module.exports = routes