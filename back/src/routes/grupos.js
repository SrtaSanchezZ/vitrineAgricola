const routes = require("express").Router();
const gruController = require('../controllers/grupos');

routes.get(
    '/grupos',
    gruController.obter
);
routes.post(
    '/grupos', 
    gruController.cadastrar
);
routes.put(
    '/grupos/:id',
    gruController.atualizar
);
routes.delete(
    '/grupos/:id',
    gruController.apagar
);

module.exports = routes;