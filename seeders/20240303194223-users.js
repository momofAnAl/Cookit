"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "anhtran",
          password: "1234",
        },
        {
          username: "michaellandes",
          password: "5678",
        },
        {
          username: "vinson",
          password: 'vaiono1234'
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
