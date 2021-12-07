'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tipo_causa_registro', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_causa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tipo_causa",
          key: "id",
        }
      },
      registro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "registro",
          key: "id",
        }
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tipo_causa_registro');
  },
};
