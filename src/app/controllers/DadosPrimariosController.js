const UF = require("../models/UF");
const Genero = require("../models/Genero");
const EstadoCivil = require("../models/EstadoCivil");
const ClasseCausa = require("../models/ClasseCausa");
const TipoCausa = require("../models/TipoCausa");
const Usuario = require("../models/Usuario");

class DadosPrimariosController {

    async store(req, res) {

        const usuario = await Usuario.findOne({ where: { nome: "Unipê" }});

        if(usuario){
            return res.status(400).json({ error: 'Essa rota só pode ser usada uma vez' });
        }

        await UF.create({ 
            estado: "Acre", 
            sigla: "AC" 
        });
        await UF.create({ 
            estado: "Alagoas", 
            sigla: "AL"
        });
        await UF.create({ 
            estado: "Amapá", 
            sigla: "AP"
        });
        await UF.create({ 
            estado: "Amazonas", 
            sigla: "AM"
        });
        await UF.create({ 
            estado: "Bahia", 
            sigla: "BA"
        });
        await UF.create({ 
            estado: "Ceará", 
            sigla: "CE"
        });
        await UF.create({ 
            estado: "Distrito Federal", 
            sigla: "DF" 
        });
        await UF.create({ 
            estado: "Espírito Santo", 
            sigla: "ES" 
        });
        await UF.create({ 
            estado: "Goiás", 
            sigla: "GO" 
        });
        await UF.create({ 
            estado: "Maranhão", 
            sigla: "MA" 
        });
        await UF.create({ 
            estado: "Mato Grosso", 
            sigla: "MT" 
        });
        await UF.create({ 
            estado: "Mato Grosso do Sul", 
            sigla: "MS" 
        });
        await UF.create({ 
            estado: "Minas Gerais", 
            sigla: "MG" 
        });
        await UF.create({ 
            estado: "Pará", 
            sigla: "PA" 
        });
        await UF.create({ 
            estado: "Paraíba", 
            sigla: "PB" 
        });
        await UF.create({ 
            estado: "Paraná", 
            sigla: "PR" 
        });
        await UF.create({ 
            estado: "Pernambuco", 
            sigla: "PE" 
        });
        await UF.create({ 
            estado: "Piauí", 
            sigla: "PI" 
        });
        await UF.create({ 
            estado: "Rio de Janeiro", 
            sigla: "RJ" 
        });
        await UF.create({ 
            estado: "Rio Grande do Norte", 
            sigla: "RN" 
        });
        await UF.create({ 
            estado: "Rio Grande do Sul", 
            sigla: "RS" 
        });
        await UF.create({ 
            estado: "Rondônia", 
            sigla: "RO" 
        });
        await UF.create({ 
            estado: "Roraima", 
            sigla: "RR" 
        });
        await UF.create({ 
            estado: "Santa Catarina", 
            sigla: "SC" 
        });
        await UF.create({ 
            estado: "São Paulo", 
            sigla: "SP" 
        });
        await UF.create({ 
            estado: "Sergipe", 
            sigla: "SE" 
        });
        await UF.create({ 
            estado: "Tocantins", 
            sigla: "TO" 
        });

        await Genero.create({ nome: "Feminino" });
        await Genero.create({ nome: "Masculino" });
        await Genero.create({ nome: "Outro" });
        await Genero.create({ nome: "Prefiro não informar" });

        await EstadoCivil.create({ nome: "Solteiro(a)" });
        await EstadoCivil.create({ nome: "Casado(a)" });
        await EstadoCivil.create({ nome: "Divorciado(a)" });
        await EstadoCivil.create({ nome: "Viúvo(a)" });
        await EstadoCivil.create({ nome: "União Estável" });

        await ClasseCausa.create({ nome: "Alimentos" });
        await ClasseCausa.create({ nome: "Guarda" });
        await ClasseCausa.create({ nome: "Divórcio" });
        await ClasseCausa.create({ nome: "Reconhecimento" });
        await ClasseCausa.create({ nome: "Outros" });

        await TipoCausa.create({ 
            nome: "Ação de alimentos", 
            classe_causa_id: 1
        });
        await TipoCausa.create({ 
            nome: "Alimentos com regulamentação de visita", 
            classe_causa_id: 1
        });
        await TipoCausa.create({ 
            nome: "Exoneração de alimentos", 
            classe_causa_id: 1
        });
        await TipoCausa.create({ 
            nome: "Execução de alimentos", 
            classe_causa_id: 1
        });
        await TipoCausa.create({ 
            nome: "Alimentos Gravídicos", 
            classe_causa_id: 1
        });
        await TipoCausa.create({ 
            nome: "Oferta de alimentos", 
            classe_causa_id: 1
        });
        await TipoCausa.create({ 
            nome: "Oferta de alimentos com regulamentação de visitas", 
            classe_causa_id: 1
        });

        await TipoCausa.create({ 
            nome: "Unilateral", 
            classe_causa_id: 2
        });
        await TipoCausa.create({ 
            nome: "Provisória", 
            classe_causa_id: 2
        });

        await TipoCausa.create({ 
            nome: "Consensual", 
            classe_causa_id: 3
        });
        await TipoCausa.create({ 
            nome: "Litigioso", 
            classe_causa_id: 3
        });
        await TipoCausa.create({ 
            nome: "Divórcio Edital", 
            classe_causa_id: 3
        });

        await TipoCausa.create({ 
            nome: "De união estável", 
            classe_causa_id: 4
        });
        await TipoCausa.create({ 
            nome: "Reconhecimento e dissolução de união estável", 
            classe_causa_id: 4
        });
        await TipoCausa.create({ 
            nome: "De união estável pós morte", 
            classe_causa_id: 4
        });
        await TipoCausa.create({ 
            nome: "De paternidade/maternidade", 
            classe_causa_id: 4
        });

        await TipoCausa.create({ 
            nome: "Alvará judicial", 
            classe_causa_id: 5
        });
        await TipoCausa.create({ 
            nome: "Interdição-Curatela", 
            classe_causa_id: 5
        });
        await TipoCausa.create({ 
            nome: "Inventário", 
            classe_causa_id: 5
        });
        await TipoCausa.create({ 
            nome: "Negatório de Paternidade", 
            classe_causa_id: 5
        });
        await TipoCausa.create({ 
            nome: "Suprimento de idade", 
            classe_causa_id: 5
        });
        await TipoCausa.create({ 
            nome: "Assentamento de Registro", 
            classe_causa_id: 5
        });
        await TipoCausa.create({ 
            nome: "Outros", 
            classe_causa_id: 5
        });
        
        await Usuario.create({
            nome: "Unipê",
            email: "Unipe@gmail.com",
            senha: "unipeadminmaster",
            admin: true,
            status: true,
        })

        return res.status(200).json({ message: "Os dados primários foram inseridos no banco" });
    }

    async index_all(req, res) {

        const uf = await UF.findAll();
        const genero = await Genero.findAll();
        const estadocivil = await EstadoCivil.findAll();
        const classe_causa = await ClasseCausa.findAll();
        const tipo_causa = await TipoCausa.findAll();

        const all = {
            uf,
            genero,
            estadocivil,
            classe_causa,
            tipo_causa
        }

        if (!uf && !genero && !estadocivil && !classe_causa && !tipo_causa) { return res.status(404).json({ error: "Arquivos ainda não enviados" }); };

        return res.status(200).json( all );
    }
}

module.exports = new DadosPrimariosController();