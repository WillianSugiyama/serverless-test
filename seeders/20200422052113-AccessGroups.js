'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AccessGroups', [{
      value: 'User manager',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      value: 'Content manager',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      value: 'Content curator',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AccessGroups', null, {});
  }
};