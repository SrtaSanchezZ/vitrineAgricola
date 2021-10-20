const routes = require("express").Router();
const vitController = require('../controllers/vitrine')

routes.get(
    '/vitrine',
    vitController.obter
)
routes.post(
    '/vitrine',
    vitController.cadastrar
)

module.exports = routes