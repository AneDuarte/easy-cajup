const Usuario = require("../models/Usuario");
const Registro = require("../models/Registro");

class StatusController {
    async updateusuario(req, res) {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                error: "Usuário não encontrado.",
            });
        }

        if (usuario.id == 1) { 
            return res.status(400).json({ 
                error: "Este usuário não pode ser desativado",
            });
        }

        await usuario.update({
            status: !usuario.status,
        });

        return res.status(200).json(usuario);
    }

    async updateregistro(req, res) {
        const { id } = req.params;

        const registro = await Registro.findByPk(id);

        if (!registro) {
            return res.status(404).json({
                error: "Registro não encontrado.",
            });
        }

        await registro.update({
            status: !registro.status,
        });

        return res.status(200).json(registro);
    }

    async adminusuario(req, res) {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                error: "Usuário não encontrado.",
            });
        }

        if (usuario.id == 1) { 
            return res.status(400).json({ 
                error: "Este usuário só pode ser admin",
            });
        }

        await usuario.update({
            admin: !usuario.admin,
        });

        return res.status(200).json(usuario);
    }
}

module.exports = new StatusController();