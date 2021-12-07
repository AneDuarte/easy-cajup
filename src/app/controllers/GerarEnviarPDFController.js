const Mail = require("../../lib/Mail");
const Yup = require("yup");

const Registro = require("../models/Registro");
const EstadoCivil = require("../models/EstadoCivil");
const Telefone = require("../models/Telefone");
const Genero = require("../models/Genero");
const UF = require("../models/UF");
const Endereco = require("../models/Endereco");
const Constituinte = require("../models/Constituinte");
const TipoCausa = require("../models/TipoCausa");
const TipoCausa_Registro = require("../models/TipoCausa_Registro");

class GerarEnviarPDFController {
    async gerarenviarpdf(req,res){

        const schema = Yup.object().shape({
            receptor_nome: Yup.string().required(),
            receptor_email: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação." });
        }

        const { id } = req.params;

        const { receptor_nome, receptor_email } = req.body;

        const coordenador = req.userNome;

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

        if(!registro){ return res.status(404).json({ erro: "Registro não encontrado."})};

        Mail.sendMail({
            to: receptor_email,
            subject: `Email com informações do caso de ${registro.constituinte.nome} atendido pelo Cajup`,
            template: 'gerarenviarpdf',
            context: {
                coordenador,
                receptor: receptor_nome,

                nome: registro.constituinte.nome,
                cpf: registro.constituinte.cpf,
                rg: registro.constituinte.rg,
                genero: registro.constituinte.genero.nome,
                estado_civil: registro.constituinte.estado_civil.nome,

                email: registro.constituinte.email,
                telefone: registro.constituinte.telefone.num_obrigatorio,
                telefone_opcional: registro.constituinte.telefone.num_opcional,

                rua: registro.constituinte.endereco.rua,
                numero: registro.constituinte.endereco.numero,
                bairro: registro.constituinte.endereco.bairro,
                cidade: registro.constituinte.endereco.cidade,
                uf: `${registro.constituinte.endereco.uf.estado} (${registro.constituinte.endereco.uf.sigla})`,
                cep: registro.constituinte.endereco.cpf,
                complemento: registro.constituinte.endereco.complemento,

                historico: registro.historico,
                observacoes: registro.observacoes,
            }

        }).then(message => {
            console.log(message)
            return res.status(200).json({message: "PDF Criado e Email enviado"});
        }).catch(err => {
            console.log(err)
            return res.status(400).json({message: "Email não enviado"});
        })

}};

module.exports = new GerarEnviarPDFController;