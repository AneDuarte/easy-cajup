const { Sequelize, Model } = require('sequelize');

class Genero extends Model {

    static init(sequelize) {

        super.init(
            {
                nome: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: "genero"
            }
        );

        return this;
    }

    static associate(models) {

        this.hasMany(models.Constituinte, {
            as: "constituinte",
            foreignKey: "genero_id",
        });

        this.hasMany(models.Usuario, {
            as: "usuario",
            foreignKey: "genero_id",
        });
    }
}

module.exports = Genero;