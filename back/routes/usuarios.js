const express = require('express')
const router = express.Router()
const usuController = require('../controllers/usuarios')

router.get(
    '/',
    usuController.todosUsuarios
)

module.exports = router