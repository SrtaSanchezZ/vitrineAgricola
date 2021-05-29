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

module.exports = router