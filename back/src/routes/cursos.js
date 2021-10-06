const routes = require("express").Router();
const curController = require('../controllers/cursos');

routes.get(
    '/cursos/nivel',
    curController.obterNivel
);
routes.get(
    '/cursos/area', 
    curController.obterArea
);
routes.get(
    '/cursos',
    curController.obterCurso
);

module.exports = routes;