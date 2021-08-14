const routes = require("express").Router();
const aceController = require('../controllers/acesso')

routes.post(
    '/acesso',
    aceController.login
)
routes.patch(
    '/acesso',
    aceController.validaEmail
)
routes.patch(
    '/acesso/:token',
    aceController.altSenha
)

module.exports = routes