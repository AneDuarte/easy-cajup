const Genero = require("../models/Genero");
const Yup = require("yup");

class GeneroController {
    
    async store(req, res) {

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação." });
        }

        const { nome } = req.body;

        const genero = await Genero.create({ nome });

        return res.status(200).json(genero);        
    }
    
    async index(req, res) {
        const genero = await Genero.findAll()
        if (!genero) { return res.status(404).json({ error: "Nenhum gênero registrado." }); }
        return res.status(200).json(genero);
    }

    async update(req, res) {

        const { id } = req.params;

        const { nome } = req.body;

        const genero = await Genero.findByPk(id);

        if (!genero) {
            return res.status(404).json({
                error: "Gênero não encontrado",
            });
        }

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação" });
        }

        const Ugenero = await genero.update({ nome });

        return res.status(200).json(Ugenero);
    }    
}

module.exports = new GeneroController();