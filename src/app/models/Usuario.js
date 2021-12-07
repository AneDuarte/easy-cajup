const { Sequelize, Model } = require('sequelize');
const bcrypt = require("bcryptjs");

class Usuario extends Model {

    static init(sequelize) {

        super.init(
            {
                nome: Sequelize.STRING,
                cpf: Sequelize.STRING,
                email: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
                senha: Sequelize.VIRTUAL,
                genero_id: Sequelize.INTEGER,
                senha_hash: Sequelize.STRING,
                data_inicio: Sequelize.STRING,
                matricula: Sequelize.STRING,
                periodo: Sequelize.INTEGER,
                status: Sequelize.BOOLEAN,
                telefone_id: Sequelize.STRING,
                endereco_id: Sequelize.STRING,
                token: Sequelize.STRING,
                token_created_at: Sequelize.DATE,
            },
            {
                sequelize,
                tableName: "usuario",
            }
        );

        this.addHook('beforeSave', async (usuario) => {
            if (usuario.senha) {
                usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);   
            }
        });

        return this;
    }

    static associate(models) {

        this.belongsTo(models.Endereco, {
            as: 'endereco',
            foreignKey: 'endereco_id',
        });

        this.belongsTo(models.Telefone, {
            as: 'telefone',
            foreignKey: 'telefone_id',
        });

        this.hasMany(models.Registro, {
            as: 'registro',
            foreignKey: 'usuario_id',
        });

        this.belongsTo(models.Genero, {
            as: "genero",
            foreignKey: "genero_id",
        });

    }

    checarSenha(senha) {
        return bcrypt.compare(senha, this.senha_hash);
    }
    
}

module.exports = Usuario;