const routes = require("express").Router();
const usuController = require('../controllers/usuarios');

router.get(
    '/usuarios',
    usuController.obter
)
router.post(
    '/usuarios',
    usuController.cadastrar
)
router.delete(
    '/usuarios/:id',
    usuController.deletar
)

module.exports = router