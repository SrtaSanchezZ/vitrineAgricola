const express = require('express')
const router = express.Router()
const aceController = require('../controllers/acesso')

router.post(
    '/',
    aceController.login
)
router.patch(
    '/',
    aceController.validaEmail
)
router.patch(
    '/:token',
    aceController.altSenha
)

module.exports = router