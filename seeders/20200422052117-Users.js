'use strict';

const hashPass = require('../src/utils/hashPassword');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'UserCreator',
      password: await hashPass('admin123'),
      accessGroupId: 1,
    }, {
      username: 'ContentManager',
      password: await hashPass('admin123'),
      accessGroupId: 2,
    }, {
      username: 'ContentCurator',
      password: await hashPass('admin123'),
      accessGroupId: 3,
    }], {
      individualHooks: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};