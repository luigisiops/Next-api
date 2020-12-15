'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'events',
      'userId',
      Sequelize.STRING
    )
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'events',
      'userId'
    )
  }
};
