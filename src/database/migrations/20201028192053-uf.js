'use strict';

//Exportar módulo
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("uf", {
      //Definindo campos da tabela:
      //Id, estado e sigla
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      sigla: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: { type: Sequelize.DATE, allowNull: false},
      updated_at: { type: Sequelize.DATE, allowNull: false},
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("uf");
  },
};
