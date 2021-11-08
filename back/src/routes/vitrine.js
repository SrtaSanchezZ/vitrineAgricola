const routes = require("express").Router();
const vitController = require('../controllers/vitrine')

routes.get(
    '/vitrine',
    vitController.obter
)
routes.get(
    '/vitrine/grupos',
    vitController.obterGrupo
)
routes.get(
    '/vitrine/:id',
    vitController.obterVitrineGrupo
)
routes.post(
    '/vitrine',
    vitController.cadastrar
)

module.exports = routes