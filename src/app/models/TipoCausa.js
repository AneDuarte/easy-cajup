const { Sequelize, Model } = require("sequelize");

class TipoCausa extends Model {

  static init(sequelize) {

    super.init(
      {
        nome: Sequelize.STRING,
        classe_causa_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: "tipo_causa",
      }
    );

    return this;
  }

  static associate(models) {

    this.belongsTo(models.ClasseCausa, {
        as: "classe_causa",
        foreignKey: "classe_causa_id",
      });

    this.hasMany(models.TipoCausa_Registro, {
      as: "tipo_causa_registros",
      foreignKey: "tipo_causa_id",
    });
  }
}

module.exports = TipoCausa;