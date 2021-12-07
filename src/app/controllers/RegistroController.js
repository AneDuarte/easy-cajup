const Registro = require("../models/Registro");
const EstadoCivil = require("../models/EstadoCivil");
const Telefone = require("../models/Telefone");
const Genero = require("../models/Genero");
const UF = require("../models/UF");
const Endereco = require("../models/Endereco");
const Constituinte = require("../models/Constituinte");
const TipoCausa = require("../models/TipoCausa");
const ClasseCausa = require("../models/ClasseCausa");
const TipoCausa_Registro = require("../models/TipoCausa_Registro");
const Yup = require("yup");

class RegistroController {

    async store(req, res) {

        // Dados de endereco
        const enderecoSchema = Yup.object({
            rua: Yup.string(),
            numero: Yup.string(),
            bairro: Yup.string().required(),
            cidade: Yup.string().required(),
            cep: Yup.string(),
            complemento: Yup.string(),
            uf_id: Yup.number().required(),
        });

        // Dados de telefone
        const telefoneSchema = Yup.object({
            num_obrigatorio: Yup.string().required().min(8).max(11), 
            num_opcional: Yup.string(),
        });

        // Dados de constituinte
        const constituinteSchema = Yup.object({
            nome: Yup.string().required(), 
            rg: Yup.string(),
            cpf: Yup.string()
                .when('rg', (rg, field) =>
                    rg ? field : field.required().min(11, "O CPF deve ter 11 dígitos").max(11, "O CPF deve ter 11 dígitos"),
                ),
            email: Yup.string().email(),
            genero_id: Yup.number().required(),
            estado_civil_id: Yup.number().required(),
        });
    
        // Dados de registro
        const registroSchema = Yup.object({
            historico: Yup.string().required(),
            observacoes: Yup.string(),
            data: Yup.string().required(),
            tiposcausa: Yup.array().of(Yup.number()).required(),

        });

        // Validação endereço
        if (!(await enderecoSchema.isValid(req.body))) {
            return res.status(400).json({ error: "Erro de validação nos campos de Endereço" });
        }

        // Validação telefone
        if (!(await telefoneSchema.isValid(req.body))) {
            return res.status(400).json({ error: "Erro de validação nos campos de Telefone" });
        }
        // Validação constituinte
        if (!(await constituinteSchema.isValid(req.body))) {
            return res.status(400).json({ error: "Erro de validação nos campos de Constituinte" });
        }
        // Validação registro
        if (!(await registroSchema.isValid(req.body))) {
            return res.status(400).json({ error: "Erro de validação nos campos de Registro" });
        }

        const { 
            // dados de endereco
            rua,
            numero,
            bairro,
            cidade,
            cep,
            complemento,
            uf_id, 

            // dados de telefone
            num_obrigatorio, 
            num_opcional,

            // dados de constituinte
            nome, 
            rg, 
            cpf, 
            email,
            genero_id,
            estado_civil_id, 

            // dados de registro
            historico,
            observacoes,
            data,
            tiposcausa,

        } = req.body;

        const endereco = await Endereco.create({ 
            rua, 
            numero, 
            bairro, 
            cidade, 
            cep, 
            complemento, 
            uf_id 
        });

        const endereco_id = endereco.id;

        const telefone = await Telefone.create({ 
            num_obrigatorio, 
            num_opcional 
        });

        const telefone_id = telefone.id;

        const constituinte = await Constituinte.create({ 
            nome, 
            rg, 
            cpf, 
            email, 
            genero_id, 
            estado_civil_id, 
            endereco_id, 
            telefone_id 
        });

        const constituinte_id = constituinte.id;

        const usuario_id = req.userId;

        const registro = await Registro.create({ 
            historico, 
            observacoes, 
            data,             
            usuario_id, 
            constituinte_id 
        });

        const registro_id = registro.id

        for (let index = 0; index < tiposcausa.length; index++) {
            await TipoCausa_Registro.create({
                tipo_causa_id: tiposcausa[index], 
                registro_id: registro.id
            })          
        }

        const a = await Registro.findByPk(registro.id, { 
            include: [{ 
                model: TipoCausa_Registro,
                as: 'tipo_causa_registros'                
            }]
        })
    
        return res.status(200).json(a);
    }

    async index(req, res) {

        const registro = await Registro.findAll({
            attributes: [ "id", "historico", "observacoes", "data", "status" ],
            include: [
                {
                    model: TipoCausa_Registro,
                    as: "tipo_causa_registros",
                    attributes: ['tipo_causa_id'],
                    include: [
                        {
                            model: TipoCausa,
                            as: "tipo_causa",
                            attributes: [ 'nome' ]
                        }
                    ]
                },
                {
                    model: Constituinte,
                    as: "constituinte",
                    attributes: [ 'id', 'nome', 'cpf', 'rg' , 'email' ],
                    include: [
                        {
                            model: Genero,
                            as: 'genero',
                            attributes: [ 'id','nome' ],
                        },
                        {
                            model: Telefone,
                            as: 'telefone',
                            attributes: [ 'id', 'num_obrigatorio', 'num_opcional' ],
                        },
                        {
                            model: EstadoCivil,
                            as: 'estado_civil',
                            attributes: [ 'id','nome' ],
                        },
                        {
                            model: Endereco,
                            as: 'endereco',
                            attributes: [ 'id', 'rua', 'numero', 'bairro', 'cidade', 'cep', 'complemento' ],
                            include: [
                                {
                                    model: UF,
                                    as: 'uf',
                                    attributes: [ 'id','estado', 'sigla' ],
                                }
                            ]
                        },
                    ]
                }
            ]
        });

        if (!registro) { return res.status(404).json({ error: "Nenhum resgistro realizado." }); }

        return res.status(200).json(registro);
    }

    async show(req, res) {

        const { id } = req.params;

        const registro = await Registro.findByPk(id, {
            attributes: [ "id", "historico", "observacoes", "data", "status" ],
            include: [
                {
                    model: TipoCausa_Registro,
                    as: "tipo_causa_registros",
                    attributes: ['tipo_causa_id'],
                    include: [
                        {
                            model: TipoCausa,
                            as: "tipo_causa",
                            attributes: [ 'nome' ]
                        }
                    ]
                },
                {
                    model: Constituinte,
                    as: "constituinte",
                    attributes: [ 'id', 'nome', 'cpf', 'rg' , 'email' ],
                    include: [
                        {
                            model: Genero,
                            as: 'genero',
                            attributes: [ 'id','nome' ],
                        },
                        {
                            model: Telefone,
                            as: 'telefone',
                            attributes: [ 'id', 'num_obrigatorio', 'num_opcional' ],
                        },
                        {
                            model: EstadoCivil,
                            as: 'estado_civil',
                            attributes: [ 'id','nome' ],
                        },
                        {
                            model: Endereco,
                            as: 'endereco',
                            attributes: [ 'id', 'rua', 'numero', 'bairro', 'cidade', 'cep', 'complemento' ],
                            include: [
                                {
                                    model: UF,
                                    as: 'uf',
                                    attributes: [ 'id','estado', 'sigla' ],
                                }
                            ]
                        },
                    ]
                }
            ]
        });

        var exibir = await TipoCausa_Registro.findAll({
            where: { 
                registro_id: id
            }
        },
        {
            include: [
                {
                    model: TipoCausa,
                    as: "tipo_causa",
                    attributes: [ 'id','nome' ],
                },
                {
                    model: Registro,
                    as: registro,
                    attributes: [ "id", "historico", "observacoes", "data", "status" ],
                    include: [
                        
                        {
                            model: Constituinte,
                            as: "constituinte",
                            attributes: [ 'nome', 'cpf', "rg" , "email"],
                            include: [
                                {
                                    model: Genero,
                                    as: 'genero',
                                    attributes: [ 'id','nome' ],
                                },
                                {
                                    model: Telefone,
                                    as: 'telefone',
                                    attributes: [ 'num_obrigatorio', 'num_opcional' ],
                                },
                                {
                                    model: EstadoCivil,
                                    as: 'estado_civil',
                                    attributes: [ 'id','nome' ],
                                },
                                {
                                    model: Endereco,
                                    as: 'endereco',
                                    attributes: [ 'rua', 'numero', 'bairro', 'cidade', 'cep', 'complemento' ],
                                    include: [
                                        {
                                            model: UF,
                                            as: 'uf',
                                            attributes: [ 'id','estado', 'sigla' ],
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
                
            ]
        });
        
        if (!registro) {
            return res.status(404).json({
                error: "Registro não existe.",
            });
        }

        return res.status(200).json(registro);
    }

    async update(req, res) {

        const { id } = req.params;

        if (!registro) {
            return res.status(404).json({
                error: "Registro não existe."
            });
        }

        const registro = await Registro.findByPk(id);
        const constituinte = await Constituinte.findByPk(registro.constituinte_id);
        const telefone = await Telefone.findByPk(constituinte.telefone_id);
        const endereco = await Endereco.findByPk(constituinte.endereco_id);

        const { 
            // dados de endereco
            rua,
            numero,
            bairro,
            cidade,
            cep,
            complemento,
            uf_id, 

            // dados de telefone
            num_obrigatorio, 
            num_opcional,

            // dados de constituinte
            nome, 
            rg, 
            cpf, 
            email,
            genero_id,
            estado_civil_id, 

            // dados de registro
            historico,
            observacoes,

        } = req.body;

        endereco = await Endereco.update({ 
            rua, 
            numero, 
            bairro, 
            cidade, 
            cep, 
            complemento, 
            uf_id 
        });

        const Uendereco_id = endereco.id;

        telefone = await Telefone.update({ 
            num_obrigatorio, 
            num_opcional 
        });

        const Utelefone_id = telefone.id;

        constituinte = await Constituinte.update({ 
            nome, 
            rg, 
            cpf, 
            email, 
            genero_id, 
            estado_civil_id, 
            endereco_id: Uendereco_id, 
            telefone_id: Utelefone_id
        });

        const Uconstituinte_id = constituinte.id;

        const Uregistro = await Registro.update({ 
            historico, 
            observacoes, 
            constituinte_id: Uconstituinte_id
        });

        return res.status(200).json(Uregistro);
    }    
}

module.exports = new RegistroController();