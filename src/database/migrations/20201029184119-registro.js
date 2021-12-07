module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("registro", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      historico: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      observacoes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Caso - CONCLUÍDO ou LABORATÓRIO
      // false == CASO CONCLUÍDO
      // true == LABORATÓRIO
      // Mudar ao enviar pdf, aparecer botão de mudança de status
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuario",
          key: "id",
        },
      },
      constituinte_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "constituinte",
          key: "id",
        },
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("registro");
  },
};