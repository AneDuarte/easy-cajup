// Require carrega um módulo
const { Sequelize, Model } = require('sequelize');

class Endereco extends Model {
    // static define um método estático paraa uma classe
    // As associações entre métodos nunca mudam
    static init(sequelize) {

        super.init(
            {
                rua: Sequelize.STRING,
                numero: Sequelize.STRING,
                bairro: Sequelize.STRING,
                cidade: Sequelize.STRING,
                cep: Sequelize.STRING,
                complemento: Sequelize.STRING,
                uf_id: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: "endereco"
            }
        );

        return this;
    }

    static associate(models) {

        this.belongsTo(models.UF, {
            as: "uf",
            foreignKey: "uf_id",
        });

        this.hasMany(models.Usuario, {
            as: "usuario",
            foreignKey: "endereco_id",
        });

        this.hasMany(models.Constituinte, {
            as: "constituinte",
            foreignKey: "endereco_id",
        });
    }
}

module.exports = Endereco