const routes = require("express").Router();
const usuController = require('../controllers/usuarios');

routes.get(
    '/usuarios',
    usuController.obter
);
routes.post(
    '/usuarios', 
    usuController.cadastrar
);
routes.put(
    '/usuarios/:id',
    usuController.atualizar
);
routes.delete(
    '/usuarios/:id',
    usuController.apagar
);

module.exports = routes;