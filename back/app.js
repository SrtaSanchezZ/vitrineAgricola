const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');
const cors = require('cors');

app.use(cors()); //ponte de requisições
app.use(morgan('dev'));
app.use(bodyParse.json()); //entrada de json no body
app.use(express.json()); //servidor e json

//validando requisições
app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-Width, Content-Type, Accept, Authorization',
    );

    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

//quando não encontrar nenhuma rota vai entrar aqui
app.use((req, res, next) => {
    const erro = new Error('Erro 404, rota não encontrada!');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: { mensagem: error.message }
    });
});

module.exports = app;