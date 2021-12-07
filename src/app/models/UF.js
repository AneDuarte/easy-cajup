// Require carrega um módulo
const { Sequelize, Model } = require('sequelize');

class UF extends Model {
    // static define um método estático para uma classe
    // As associações entre métodos nunca mudam
    static init(sequelize) {

        super.init(
            {
                estado: Sequelize.STRING,
                sigla: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: "uf"
            }
        );

        return this;
    }

    static associate(models) {

        this.hasMany(models.Endereco, {
            as: "endereco",
            foreignKey: "uf_id",
        });
    }
}

module.exports = UF;