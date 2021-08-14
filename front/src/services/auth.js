const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            if (err) {
                return res.json({ sucesso: false, msg: 'Falha ao tentar autenticar o token!' });
            } else {
                //se tudo correr bem, salvará a requisição para o uso em outras rotas
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            sucesso: false,
            msg: '403 - Token inválido ou expirado!'
        });
    }
}