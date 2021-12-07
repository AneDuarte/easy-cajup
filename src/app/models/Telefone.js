const { Sequelize, Model } = require("sequelize");

class Telefone extends Model {

    static init(sequelize) {

        super.init(
            {
                num_obrigatorio: Sequelize.STRING,
                num_opcional: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: "telefone",
            }
        );

        return this;
    }

    static associate(models) {

        this.hasMany(models.Constituinte, {
            as: "constituinte",
            foreignKey: "telefone_id",
        });

        this.hasMany(models.Usuario, {
            as: "usuario",
            foreignKey: "telefone_id",
        });
    }
}

module.exports = Telefone;