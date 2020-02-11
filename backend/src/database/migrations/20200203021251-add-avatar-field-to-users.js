'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',//NOME DA TABELA
      'avatar_id',//CAMPO QUE VOU ADICIONAR A TABELA
      {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'users',
      'avatar_id'
    );
  }
};
