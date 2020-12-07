'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      sub_title: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      nation: {
        type: Sequelize.STRING
      },
      runtime: {
        type: Sequelize.STRING
      },
      pubdate: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      actor: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      poster: {
        type: Sequelize.STRING
      },
      story1: {
        type: Sequelize.STRING
      },
      story2: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('movies');
  }
};