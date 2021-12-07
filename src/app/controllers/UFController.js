const UF = require("../models/UF");
const Yup = require("yup");

class UFController { 

    async store(req, res) {
        const schema = Yup.object().shape({
            estado: Yup.string().required(),
            sigla: Yup.string().required(),
        });
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação"});
        }

        const { 
            estado, 
            sigla 
        } = req.body;

        const uf = await UF.create({ 
            estado, 
            sigla 
        });

        return res.status(200).json(uf);
    }

    async index(req, res) {
        const uf = await UF.findAll()
        if (!uf) { return res.status(404).json({ error: "Nenhuma unidade federativa registrada." }); }
        return res.status(200).json(uf);
    }

}

module.exports = new UFController();