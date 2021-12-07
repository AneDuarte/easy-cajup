module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'usuario', // table name
        'token', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'usuario',
        'token_created_at',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),      
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('usuario', 'token'),
      queryInterface.removeColumn('usuario', 'token_created_at'),      
    ]);
  },
};