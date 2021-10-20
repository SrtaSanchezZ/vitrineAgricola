const express = require('express');
const morgan = require('morgan');
const path = require("path");
const cors = require('cors');

const app = express();

app.use(cors()); //ponte de requisiçõe
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/files', express.static(path.resolve(__dirname, 'uploads')));

app.use(require('./routes/noticias'));
app.use(require('./routes/produtos'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/acesso'));
app.use(require('./routes/grupos'));
app.use(require('./routes/cursos'));
app.use(require('./routes/vitrine'));
app.use(require('./routes/reservas'));

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

app.listen(3001);