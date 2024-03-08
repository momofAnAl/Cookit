"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "favorites",
      [
        {
          user_id: 1,
          recipes_name: "Teriyaki Chicken",
        },
        {
          user_id: 1,
          recipes_name: "Fish Fumet recipes",
        },
        {
          user_id: 1,
          recipes_name: "Chicken Tenders with Creamy Honey Mustard",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("favorites", null, {});
  },
};
