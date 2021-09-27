'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [{
      name: 'Test1',
      email: 'test1@test.com.br',
      password: 'test1test',
      minutes: 10
    }, {
      name: 'Test2',
      email: 'test2@test.com.br',
      password: 'test2test',
      minutes: 102
    }, {
      name: 'Test3',
      email: 'test3@test.com.br',
      password: 'test3test',
      minutes: 224
    }, {
      name: 'Test4',
      email: 'test4@test.com.br',
      password: 'test4test',
      minutes: 300
    }, {
      name: 'Test5',
      email: 'test5@test.com.br',
      password: 'test5test',
      minutes: 314
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('People', null, {});

  }
};
