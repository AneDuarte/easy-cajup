const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {

    const { nome, admin } = await Usuario.findByPk(req.userId);

    if (!admin) {
        return res.status(401).json({ erro: "Usuário não autorizado" });
    }

    req.userNome = nome;

    return next();

};