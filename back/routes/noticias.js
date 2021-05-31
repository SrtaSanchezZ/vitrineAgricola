const express = require('express');
const router = express.Router();
const notController = require('../controllers/noticias');
const fileUploads = require('../service/imgs');

router.get(
    '/',
    notController.obter
)
router.post(
    '/',
    fileUploads.upload.array('imagem'),
    notController.cadastro
)
router.put(
    '/:id',
    notController.atualizar
)

module.exports = router