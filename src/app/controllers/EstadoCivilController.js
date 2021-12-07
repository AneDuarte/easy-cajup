const EstadoCivil = require("../models/EstadoCivil");
const Yup = require("yup");

class EstadoCivilController {

    async store(req, res) {

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação" });
        }

        const { nome } = req.body;

        const estadoCivil = await EstadoCivil.create({ nome });

        return res.status(200).json(estadoCivil);
    }

    async index(req, res) {
        const estadosCivis = await EstadoCivil.findAll();
        if (!estadosCivis) { return res.status(404).json({ error: "Nenhum estado civil registrado." }); }
        return res.status(200).json(estadosCivis);
    }

    async update(req, res) {

        const { id } = req.params;

        const { nome } = req.body;

        const estadoCivil = await EstadoCivil.findByPk(id);

        if (!estadoCivil) {
            return res.status(404).json({
                error: "Estado civil não encontrado",
            });
        }

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação" });
        }

        const UestadoCivil = await estadoCivil.update({ nome });

        return res.status(200).json(UestadoCivil);
    }    
}

module.exports = new EstadoCivilController();