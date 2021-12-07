const Yup = require("yup");
const TipoCausa_Registro = require("../models/TipoCausa_Registro");

class TipoCausa_RegistroController {

    async store(req, res) {
        
        const schema = Yup.object().shape({
            tipos_causa: Yup.array().of(Yup.number()),
            registro_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: "Erro de validação" });
        }

        const { 
            tipos_causa, 
            registro_id 
        } = req.body;

        async function negocioChato(tipoCausa, registroId) {

            const tipoCausa_registro = await TipoCausa_Registro.create({
                tipo_causa_id: tipoCausa, 
                registro_id: registroId
            })

            console.log(tipoCausa_registro)
        }

        tipos_causa.forEach(tipo_causa => {
            negocioChato(tipo_causa, registro_id)
        }) 

        return res.status(200).json({ msg: "tudo ok" });
    }
}

module.exports = new TipoCausa_RegistroController();