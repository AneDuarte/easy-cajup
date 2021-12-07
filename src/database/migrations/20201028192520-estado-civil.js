'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('estado_civil', { 
      // Definindo campos da tabela: id e nome
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('estado_civil');    
  },
};