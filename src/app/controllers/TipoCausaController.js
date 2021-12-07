const TipoCausa = require("../models/TipoCausa");
const ClasseCausa = require("../models/ClasseCausa");
const Yup = require("yup");

class TipoCausaController {

    async store(req, res) {

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            classe_causa_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação"});
        }

        const { 
            nome, 
            classe_causa_id 
        } = req.body;

        const tipoCausa = await TipoCausa.create({ 
           
            nome, 
            classe_causa_id
        
        });
        return res.status(200).json(tipoCausa);
    }

    async index(req, res) {
        
        const tipoCausa = await TipoCausa.findAll({
            attributes: ['id','nome'],
            include: [
                {
                    model: ClasseCausa,
                    as: 'classe_causa',
                    attributes: ['id','nome']
                }
            ]
        });
        
        if (!tipoCausa) { return res.status(404).json({ error: "Nenhum tipo de causa registrada." }); }
        return res.status(200).json(tipoCausa);
    }
    
    async update (req, res) {

        const { id } = req.params;

        const tipoCausa = await TipoCausa.findByPk(id);

        if (!tipoCausa) {
            return res.status(404).json({
                error: "Tipo de causa não encontrado",
            });
        }

        const schema = Yup.object().shape({
            nome: Yup.string(),
            classe_causa_id: Yup.number()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação"});
        }

        const { 
            nome,
            classe_causa_id
        } = req.body;

        const UtipoCausa = await tipoCausa.update({ 
            nome,
            classe_causa_id
        });

        return res.status(200).json(UtipoCausa);
    }  
}

module.exports = new TipoCausaController();