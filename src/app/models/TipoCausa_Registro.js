const { Sequelize, Model } = require('sequelize');

class TipoCausa_Registro extends Model {

    static init(sequelize) {

        super.init(
            {
                tipo_causa_id: Sequelize.INTEGER,
                registro_id: Sequelize.INTEGER,
            },
            {
                sequelize,
                tableName: "tipo_causa_registro"
            }
        );
        return this;
    }

    static associate(models) {

        this.belongsTo(models.TipoCausa, {
            as: "tipo_causa",
            foreignKey: "tipo_causa_id"
        })

        this.belongsTo(models.Registro, {
            as: "registro",
            foreignKey: "registro_id"
        });
    }
}

module.exports = TipoCausa_Registro;