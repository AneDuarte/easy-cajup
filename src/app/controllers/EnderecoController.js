const Endereco = require("../models/Endereco");
const UF = require("../models/UF");
const Yup = require("yup");

class EnderecoController {

    async index(req, res) {

        const endereco = await Endereco.findAll({
            attributes: [ 'rua', 'numero', 'bairro', 'cidade', 'cep', 'complemento' ],
                include: [
                {
                    model: UF,
                    as: 'uf',
                    attributes: [ 'estado', 'sigla' ],
                }
            ]
        });

        if (!endereco) { return res.status(404).json({ error: "Nenhum endereço registrado." }); }
        return res.status(200).json(endereco);
    }

    async show(req, res) {
        const { id } = req.params;

        const endereco = await Endereco.findByPk(id, {
            attributes: [ 'rua', 'numero', 'bairro', 'cidade', 'cep', 'complemento' ],
                include: [
                {
                    model: UF,
                    as: 'uf',
                    attributes: [ 'estado', 'sigla' ],
                }
            ]
        });

        if (!endereco) {
            return res.status(404).json({
                error: "Endereço não existe.",
            });
        }

        return res.status(200).json(endereco);
    }

    async update(req, res) {

        const { id } = req.params;

        const endereco = await Endereco.findByPk(id);

        
        if (!endereco) {
            return res.status(404).json({
                error: "Endereço não existe.",
            });
        }

        const Schema = Yup.object({
            rua: Yup.string(),
            numero: Yup.string(),
            bairro: Yup.string(),
            cidade: Yup.string(),
            cep: Yup.string(),
            complemento: Yup.string(),
            uf_id: Yup.number(),
        });

        if (!(await Schema.isValid(req.body))) {
            return res.status(400).json({ error: "Erro de validação" });
        }

        const { 
            rua,
            numero,
            bairro,
            cidade,
            cep,
            complemento,
            uf_id,
        } = req.body;

        const Uendereco = await endereco.update({
            rua,
            numero,
            bairro,
            cidade,
            cep,
            complemento,
            uf_id,
        });
        
        return res.status(200).json(Uendereco);
    }
}

module.exports = new EnderecoController();