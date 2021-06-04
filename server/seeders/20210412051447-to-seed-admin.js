'use strict';
const {
  hashPassword
} = require('../helpers/bcrypt.js')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'admin-putra',
      email: 'admin-putra@mail.com',
      password: hashPassword('123123'),
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'putraawali',
      email: 'putra@mail.com',
      password: hashPassword('123123'),
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};