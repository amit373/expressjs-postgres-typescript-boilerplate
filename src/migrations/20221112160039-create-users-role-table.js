/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'user_role',
      {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.BIGINT,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
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
    await queryInterface.dropTable('user_role');
  },
};
