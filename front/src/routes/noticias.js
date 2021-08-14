const routes = require("express").Router();
const multer = require('multer');
const multerConfig = require('../services/multer');
const notController = require('../controllers/noticias');

routes.get(
    '/noticias',
    notController.obter
);
routes.post(
    '/noticias', 
    multer(multerConfig).single('file'),
    notController.cadastrar
);
routes.put(
    '/noticias/:id',
    notController.atualizar
);
routes.delete(
    '/noticias/:id',
    notController.apagar
);

module.exports = routes;