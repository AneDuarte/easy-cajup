'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('telefone', { 
      // Definindo campos da tabela: id, número 1 e número 2
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
      },
      num_obrigatorio: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      num_opcional: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      });    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('telefone');    
  },
};
