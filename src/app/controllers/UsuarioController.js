const Usuario = require('../models/Usuario');
const Genero = require('../models/Genero');
const Endereco = require("../models/Endereco");
const Telefone = require("../models/Telefone");
const UF = require("../models/UF");
const Yup = require("yup");
const { min } = require('../models/Usuario');

class UsuarioController {

    async store_admin(req, res) {
        //Cria admin
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().required().email(),
            senha: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação"});
        }

        const { 
            nome,
            email,
            senha,
        } = req.body;

        const usuario = await Usuario.findAll({where: {email}})
        
        if(!usuario.length == 0){  // aqui eu verifico se o object retornado da busca é vazio 
            return res.status(200).json({msg: "email ja cadastrado"});
        }

        const usuario_admin = await Usuario.create({
            nome,
            email,
            senha,
            admin: true,
            status: true,
        });

        return res.status(200).json(usuario_admin);
    }
    
    async store_extensionista(req, res) {
        //cria extensionista

        //Dados de extensionista
        const extensionistaSchema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().required().email(),
            senha: Yup.string().required().min(6),
            cpf: Yup.string().required().min(11).max(11),
            data_inicio: Yup.string().required(),
            matricula: Yup.string().required().min(8).max(8),
            periodo: Yup.number().required().min(1),
            genero_id: Yup.number().required(),  
        });

        //Dados de telefone
        const telefoneSchema = Yup.object({
            num_obrigatorio: Yup.string().required(),
            num_opcional: Yup.string().notRequired(),
        });

        //Dados de endereço
        const enderecoSchema = Yup.object({
            rua: Yup.string().notRequired(),
            numero: Yup.string().notRequired(),
            bairro: Yup.string().notRequired(),
            cidade: Yup.string().notRequired(),
            cep: Yup.string().notRequired(),
            complemento: Yup.string().notRequired(),
            uf_id: Yup.number().notRequired(),
        })
        
        //validação de extensionista
        if (!(await extensionistaSchema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação nos campos de extensionista"});
        }

        //Validação de telefone
        if (!(await telefoneSchema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação nos campos de telefone"});
        }

        //Validação de endereço
        if (!(await enderecoSchema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação nos campos de endereço"});
        }

        const { 

            //Dados de extensionista
            nome,
            cpf,
            email,
            senha,
            data_inicio,
            matricula,
            periodo,
            genero_id,

            //Dados de telefone
            num_obrigatorio,
            num_opcional,
            
            //Dados de endereço
            rua,
            numero,
            bairro,
            cidade,
            cep,
            complemento,
            uf_id,

        } = req.body;

        const usuario = await Usuario.findAll({where: {email}})
        
        if(!usuario.length == 0){  // aqui eu verifico se o object retornado da busca é vazio 
            return res.status(200).json({msg: "email ja cadastrado"});
        }

        const telefone = await Telefone.create({
            num_obrigatorio,
            num_opcional,
        });

        const telefone_id = telefone.id;

        if(uf_id){
            const endereco = await Endereco.create({
                rua,
                numero,
                bairro,
                cidade,
                cep,
                complemento,
                uf_id,
            });

            const endereco_id = endereco.id;
        }else{
            var endereco_id = 1;
        }

        const usuario_extensionista = await Usuario.create({
            nome,
            cpf,
            email,
            senha,
            data_inicio,
            matricula,
            periodo,
            genero_id,
            telefone_id,
            endereco_id,
        });

        return res.status(200).json(usuario_extensionista);

    }

    async index(req, res) {
        //Mostra tudo
        const usuarios = await Usuario.findAll({
            attributes: [ 'id', 'nome', 'cpf' , 'email', 'matricula', 'periodo', 'status', 'admin', 'data_inicio' ],
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
        });

        if (!usuarios) { return res.status(404).json({ error: "Nenhum usuário registrado." }); }
        
        return res.status(200).json(usuarios);
    }

    async index_admin(req, res) {
        //Mostra só admin

        const usuarios = await Usuario.findAll({
            where: { 
                admin: true
            }
        },
        {
            attributes: [ 'id', 'nome', 'email', 'status', 'admin' ],
        });

        if (!usuarios) { return res.status(404).json({ error: "Nenhum admin encontrado." }); }

        return res.status(200).json(usuarios);
    }

    async indexdesativados(req, res) {
        //Mostra extensionistas desativados

        const usuarios = await Usuario.findAll({
            where: { 
                status: false,
                admin: false
            }
        },
        {
            attributes: [ 'id', 'nome', 'cpf' , 'email', 'matricula', 'periodo', 'status', 'admin', 'data_inicio' ],
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
        });

        if (!usuarios) { return res.status(404).json({ error: "Nenhum usuário desativado encontrado." }); }

        return res.status(200).json(usuarios);
    }

    async indexativados(req, res) {
        //Mostra extensionistas ativados

        const usuarios = await Usuario.findAll({
            where: { 
                status: true,
                admin: false
            }
        },
        {
            attributes: [ 'id', 'nome', 'cpf' , 'email', 'matricula', 'periodo', 'status', 'admin', 'data_inicio' ],
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
        });

        if (!usuarios) { return res.status(404).json({ error: "Nenhum usuário desativado encontrado." }); }

        return res.status(200).json(usuarios);
    }

    async show(req, res) {

        const { id } = req.params;

        const usuario = await Usuario.findByPk(id, {
            attributes: [ 'id', 'nome', 'cpf' , 'email', 'matricula', 'periodo', 'status', 'admin', 'data_inicio' ],
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
        });

        if (!usuario) {
            return res.status(404).json({
                error: "Usuário não encontrado."
            });
        }

        return res.status(200).json(usuario);
    }

    async update(req, res) {

        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        const endereco = await Endereco.findByPk(usuario.endereco_id)
        const telefone = await Telefone.findByPk(usuario.telefone_id)

        if (!usuario) {
            return res.status(404).json({
                error: "Usuário não encontrado.",
            });
        }

        //Dados de extensionista
        const extensionistaSchema = Yup.object().shape({
            email: Yup.string().email(),
            senha: Yup.string().min(6),
            periodo: Yup.number().min(1), 
        });

        //Dados de telefone
        const telefoneSchema = Yup.object({
            num_obrigatorio: Yup.string(),
            num_opcional: Yup.string(),
        });

        //Dados de endereço
        const enderecoSchema = Yup.object({
            rua: Yup.string(),
            numero: Yup.string(),
            bairro: Yup.string(),
            cidade: Yup.string(),
            cep: Yup.string(),
            complemento: Yup.string(),
            uf_id: Yup.number(),
        })
        
        //validação de extensionista
        if (!(await extensionistaSchema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação nos campos de extensionista"});
        }

        //Validação de telefone
        if (!(await telefoneSchema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação nos campos de telefone"});
        }

        //Validação de endereço
        if (!(await enderecoSchema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação nos campos de endereço"});
        }

        const { 

            email,
            senha,
            periodo,

            num_obrigatorio,
            num_opcional,
            
            rua,
            numero,
            bairro,
            cidade,
            cep,
            complemento,
            uf_id,

        } = req.body;

        const Utelefone = await telefone.update({
            num_obrigatorio,
            num_opcional,
        });

        const Utelefone_id = Utelefone.id;

        if(endereco){
            const Uendereco = await endereco.update({
                rua,
                numero,
                bairro,
                cidade,
                cep,
                complemento,
                uf_id,
            });

            const Uendereco_id = Uendereco.id;

            const Uusuario_extensionista_endereco = await usuario.update({
                endereco_id: Uendereco_id,
            });
        }

        const Uusuario_extensionista = await usuario.update({
            email,
            senha,
            periodo,
            telefone_id: Utelefone_id,
        });

        return res.status(200).json(Uusuario_extensionista);
        
    }

}

module.exports = new UsuarioController();