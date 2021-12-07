'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('constituinte', { 
      // Definindo campos da tabela: id, nome, RG, CPF, email, estado civil, endereço, telefone
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
      genero_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "genero",
          key: "id",
        }      
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: true,        
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: true,       
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,       
      },
      estado_civil_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "estado_civil",
          key: "id",
        }
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "endereco",
          key: "id",
        }
      },
      telefone_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "telefone",
          key: "id",
        }
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      });    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('constituinte');    
  },
};
