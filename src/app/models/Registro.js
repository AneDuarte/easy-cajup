const { Sequelize, Model } = require("sequelize");

class Registro extends Model {

  static init(sequelize) {

    super.init(

      {
        historico: Sequelize.STRING,
        observacoes: Sequelize.STRING,
        data: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        usuario_id: Sequelize.INTEGER,
        constituinte_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: "registro",
      }

    );

    return this;
  }

  static associate(models) {    

    this.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "usuario_id",
    });

    this.belongsTo(models.Constituinte, {
      as: "constituinte",
      foreignKey: "constituinte_id",
    });

    this.hasMany(models.TipoCausa_Registro, {
      as: "tipo_causa_registros",
      foreignKey: "registro_id",
    });
  }
}

module.exports = Registro;