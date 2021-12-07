module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("usuario", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
      },
      admin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Exclusivo extensionistas
      genero_id: {
        type: Sequelize.INTEGER,
        allowNull: true,  
        foreignKey: true,
        references: {
          model: "genero",
          key: "id",
        }      
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: true,        
      },
      data_inicio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      matricula: {
        type: Sequelize.STRING,
        allowNull: true,        
      },
      periodo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // Ativo ou desativo
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      telefone_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "telefone",
          key: "id",
        },
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "endereco",
          key: "id",
        },
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("usuario");
  },
};