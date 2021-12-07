'use strict';

// Exportar módulo
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("endereco", {
      // Definindo campos da tabela:
      // Id, rua número, bairro, cidade, cep, complemento, uf
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      uf_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "uf",
          key: "id",
        }
      },
      created_at: { type: Sequelize.DATE, allowNull: false},
      updated_at: { type: Sequelize.DATE, allowNull: false},
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('endereco');
  }
};
