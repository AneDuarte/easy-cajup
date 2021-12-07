const Telefone = require("../models/Telefone");
const Yup = require("yup");

class TelefoneController {

    async show (req, res) {

        const { id } = req.params;

        const telefone = await Telefone.findByPk(id);
        
        if (!telefone) {
            return res.status(404).json({ error: "Telefone não encontrado" });
        }

        return res.status(200).json(telefone);
    }    

    async index (req, res) {
        const telefones = await Telefone.findAll();
        if (!telefones) { return res.status(404).json({ error: "Nenhum telefone registrado" }); }
        return res.status(200).json(telefones);
    }

    async update (req, res) {

        const { id } = req.params;

        const telefone = await Telefone.findByPk(id);

        if (!telefone) {
            return res.status(404).json({
                error: "Telefone não existe.",
            });
        }
        
        const Schema = Yup.object({
            num_obrigatorio: Yup.string(), 
            num_opcional: Yup.string()
        });

        if (!(await Schema.isValid(req.body))) {
            return res.status(400).json({ error: "Erro de validação" });
        }

        const { 
            num_obrigatorio, 
            num_opcional 
        } = req.body;

        const Utelefone = await telefone.update({ 
            num_obrigatorio, 
            num_opcional 
        });

        return res.status(200).json(Utelefone);
    }    
}

module.exports = new TelefoneController();