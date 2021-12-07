module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tipo_causa", {
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
      classe_causa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "classe_causa",
          key: "id",
        },
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tipo_causa");
  },
};