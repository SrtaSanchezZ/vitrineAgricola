const routes = require("express").Router();
const multer = require('multer');
const multerConfig = require('../services/multer');
const proController = require('../controllers/produtos');

routes.get(
    '/produtos',
    proController.obter
);
routes.post(
    '/produtos', 
    multer(multerConfig).single('file'),
    proController.cadastrar
);
routes.put(
    '/produtos/:id',
    proController.atualizar
);
routes.delete(
    '/produtos/:id',
    proController.apagar
);

module.exports = routes;