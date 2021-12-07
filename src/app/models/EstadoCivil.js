const { Sequelize, Model } = require("sequelize");

class EstadoCivil extends Model {

    static init(sequelize) {

        super.init(
            {
                nome: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: "estado_civil",
            }
        );

        return this;
    }

    static associate(models) {

        this.hasMany(models.Constituinte, {
            as: "constituinte",
            foreignKey: "estado_civil_id",
        });
    }
}

module.exports = EstadoCivil;