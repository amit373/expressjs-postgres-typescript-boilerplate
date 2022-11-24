'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING(50),
          unique: true,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING(255),
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        deleted_at: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      {
        logging: console.log,
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
