const Usuario = require("../models/Usuario");
const { v1: uuidv1 } = require('uuid');
const Mail = require("../../lib/Mail");
var { addHours, isBefore } = require('date-fns');

class ResetarSenhaController {

    async reset (req, res) {

        const { email } = req.body;

        const usuario = await Usuario.findOne({ where: { email }});

        if (!usuario) {
			return res.status(400).json({ error: 'Usuário não encontrado' });
        }
        
        // Criar token
        const token = uuidv1();
         console.log(token);

        await usuario.update({ token, token_created_at: new Date() });

        // Enviar por email
        Mail.sendMail({ 
            to: `${email}`,
            subject: "Solicitação de nova senha",
            template: 'resetarsenha',
            context: {
                token,
            },

        }).then(message => {
            console.log(message)
            return res.status(200).json({ message: "E-mail enviado!" });
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ message: "E-mail não enviado!" });
        })                        
    }

    // Nova rota para validação e criação da nova senha
    async novasenha (req, res) {

        const { token } = req.params;

        const { senha, confirmasenha } = req.body;

        if(senha != confirmasenha) {
            return res.status(400).json({ error: 'Há divergência entre as senhas. '});
        }
        
        const usuario = await Usuario.findOne({ where: { token }});
        if (!usuario) {
			return res.status(400).json({ error: 'Token inválido' });
        }
                
        var expira = addHours(usuario.token_created_at, 1) 

        var date = new Date();
        if (!(isBefore(date, expira))) {
            return res.status(400).json({ error: 'Token expirado' });
        }           

        await usuario.update({ senha });
        return res.status(200).json({ message: 'Senha alterada com sucesso!' });        
    }    
}

module.exports = new ResetarSenhaController();