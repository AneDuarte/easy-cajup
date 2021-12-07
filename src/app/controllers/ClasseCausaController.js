const ClasseCausa = require("../models/ClasseCausa");
const Yup = require("yup");

class ClasseCausaController {

    async store(req, res) {

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação"});
        }

        const { nome } = req.body;

        const classeCausa = await ClasseCausa.create({ nome });

        return res.status(200).json(classeCausa);        
    }

    async index(req, res) {
        const classeCausa = await ClasseCausa.findAll();
        if (!classeCausa) { return res.status(404).json({ error: "Nenhuma Classe Causa registrada." }); }
        return res.status(200).json(classeCausa);
    }

    async update (req, res) {

        const { id } = req.params;

        const classeCausa = await ClasseCausa.findByPk(id);

        if (!classeCausa) {
            return res.status(404).json({
                error: "Classe de Causa não encontrado",
            });
        }

        const schema = Yup.object().shape({
            nome: Yup.string()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação"});
        }

        const { 
            nome,
        } = req.body;

        const UclasseCausa = await classeCausa.update({ 
            nome
        });

        return res.status(200).json(UclasseCausa);
    }  
}

module.exports = new ClasseCausaController();