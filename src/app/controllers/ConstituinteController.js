const Constituinte = require("../models/Constituinte");
const EstadoCivil = require("../models/EstadoCivil");
const Telefone = require("../models/Telefone");
const Endereco = require("../models/Endereco");
const Usuario = require("../models/Usuario");
const Uf = require("../models/UF");
const Genero = require("../models/Genero");
const Yup = require("yup");

class ConstituinteController {

    async index (req, res) {
        
        let constituintes 

        const { admin } = await Usuario.findByPk(req.userId);

        if(admin) {
            // Admin === true
            constituintes = await Constituinte.findAll({
                attributes: ["nome", "rg", "cpf", "email"],
                include: [
                    {
                        model: EstadoCivil,
                        as: 'estado_civil',
                        attributes: ['nome'],
                    },
                    {
                        model: Genero,
                        as: 'genero',
                        attributes: ['nome']
                    },
                    {
                        model: Telefone,
                        as: 'telefone',
                        attributes: ['num_obrigatorio', 'num_opcional'],
                    },
                    {
                        model: Endereco,
                        as: 'endereco',
                        attributes: ['rua', 'numero', 'bairro', 'cidade', 'cep', 'complemento'],
                        include: [
                            {
                                model: Uf,
                                as: 'uf',
                                attributes: ['estado', 'sigla']
                            }
                        ]           
                    }
                ]
            });
        } 
        
        else {
            // Admin === false
            constituintes = await Constituinte.findAll({
                attributes: ["nome"],
                include: [                    
                    {
                        model: Endereco,
                        as: 'endereco',
                        attributes: ['rua', 'numero', 'bairro', 'cidade', 'cep', 'complemento', 'uf_id'],                   
                    }
                ]
            });
        }

        if (!constituintes) { return res.status(404).json({ error: "Nenhum constituinte registrado" }); }
        return res.status(200).json(constituintes);
    }

    async show (req, res) {

        let constituintes 

        const { id } = req.params;

        const { admin } = await Usuario.findByPk(req.userId);

        if(admin) {
            // Admin === true
            constituintes = await Constituinte.findByPk(id, {
                attributes: ["nome", "rg", "cpf", "email"],
                include: [
                    {
                        model: EstadoCivil,
                        as: 'estado_civil',
                        attributes: ['nome'],
                    },
                    {
                        model: Genero,
                        as: 'genero',
                        attributes: ['nome']
                    },
                    {
                        model: Telefone,
                        as: 'telefone',
                        attributes: ['num_obrigatorio', 'num_opcional'],
                    },
                    {
                        model: Endereco,
                        as: 'endereco',
                        attributes: ['rua', 'numero', 'bairro', 'cidade', 'cep', 'complemento'],
                        include: [
                            {
                                model: Uf,
                                as: 'uf',
                                attributes: ['estado', 'sigla']
                            }
                        ]           
                    }
                ]
            });
        } 
        
        else {
            // Admin === false
            constituintes = await Constituinte.findAll({
                attributes: ["nome"],
                include: [                    
                    {
                        model: Endereco,
                        as: 'endereco',
                        attributes: ['rua', 'numero', 'bairro', 'cidade', 'cep', 'complemento', 'uf_id'],                   
                    }
                ]
            });
        }

        if (!constituinte) {
            return res.status(404).json({
                error: "Constituinte não existe",
            });
        }

        return res.status(200).json(constituintes);
    }

    async update (req, res) {

        const { id } = req.params;

        const constituinte = await Constituinte.findByPk(id);

        if (!constituinte) {
            return res.status(404).json({
                error: "Constituinte não existe",
            });
        }

        const schema = Yup.object().shape({
            nome: Yup.string(),
            rg: Yup.string(),
            cpf: Yup.string(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação"});
        }

        const { 
            nome, 
            rg, 
            cpf, 
            email 
        } = req.body;

        const Uconstituinte = await constituinte.update({
            nome,
            rg,
            cpf,
            email
        });

        return res.status(200).json(Uconstituinte);        
    }
}

module.exports = new ConstituinteController();