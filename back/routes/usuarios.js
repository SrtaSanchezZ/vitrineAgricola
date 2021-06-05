const express = require('express')
const router = express.Router()
const usuController = require('../controllers/usuarios')

router.get(
    '/',
    usuController.obter
)
router.post(
    '/',
    usuController.cadastrar
)
router.delete(
    '/:id',
    usuController.deletar
)

module.exports = router