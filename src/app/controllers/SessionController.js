const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const User = require("../models/Usuario");

class SessionController {
  async store(req, res) {
    
    const { email, senha } = req.body;
    const usuario = await User.findOne({
      where: { email },
    });

    if (!usuario || !(await usuario.checarSenha(senha))) {
      return res.status(400).json({ error: "Usuário ou senha inválidos" });
    }

    const { id, nome, admin, status } = usuario;

    if(status){
      return res.status(200).json({
        usuario: {
          id,
          nome,
          admin,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    }
    else{
      return res.status(401).json({ error: "Usuario foi desligado da fabrica" })
    }
  }
}

module.exports = new SessionController();