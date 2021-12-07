const { Sequelize, Model } = require("sequelize");

class ClasseCausa extends Model {

  static init(sequelize) {

    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "classe_causa",
      }
    );

    return this;
  }

  static associate(models) {

    this.hasMany(models.TipoCausa, {
      as: "tipo_causa",
      foreignKey: "classe_causa_id",
    });
  }
}

module.exports = ClasseCausa;