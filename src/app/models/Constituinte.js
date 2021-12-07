const { Sequelize, Model } = require("sequelize");

class Constituinte extends Model {

    static init(sequelize) {

        super.init(
            {
                nome: Sequelize.STRING,
                rg: Sequelize.STRING,
                cpf: Sequelize.STRING,
                email: Sequelize.STRING,
                genero_id: Sequelize.INTEGER,
                estado_civil_id: Sequelize.INTEGER,
                endereco_id: Sequelize.INTEGER,
                telefone_id: Sequelize.INTEGER,
            },
            {
                sequelize,
                tableName: "constituinte",
            }
        );

        return this;
    }

    static associate(models) {

        this.belongsTo(models.EstadoCivil, {
            as: "estado_civil",
            foreignKey: "estado_civil_id",
        });

        this.belongsTo(models.Endereco, {
            as: "endereco",
            foreignKey: "endereco_id",
        });

        this.belongsTo(models.Telefone, {
            as: "telefone",
            foreignKey: "telefone_id",
        });

        this.belongsTo(models.Genero, {
            as: "genero",
            foreignKey: "genero_id",
        });
    }
}

module.exports = Constituinte;