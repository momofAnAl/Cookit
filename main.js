require("dotenv").config();
const { LOCAL_DATABASE_USERNAME } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres", // Specify your database dialect
  host: "localhost", // Specify your database host
  port: 5432, // Specify your database port
  username: LOCAL_DATABASE_USERNAME, // Specify your database username
  password: LOCAL_DATABASE_USERNAME, // Specify your database password
  database: "Cookit", // Specify your database name
});

module.exports = {
  authenticate,
  createUser,
  getUserInfo,
  getfavoritesByuserId,
  insertUserFavorites,
};

async function authenticate(username, password) {
  const SQL = `
    SELECT id FROM users WHERE username = '${username}' AND password = '${password}';
    `;

  const [data] = await sequelize.query(SQL);
  if (data.length !== 1) {
    return null;
  }
  return data[0];
}

async function createUser(username, password) {
  const SQL = `
    INSERT INTO users (username, password) VALUES ('${username}', '${password}');
    `;

  const [_] = await sequelize.query(SQL);
}

async function getUserInfo(id) {
  const SQL = `
    SELECT id, username FROM users WHERE id = ${id};
    `;

  const [data] = await sequelize.query(SQL);
  if (data.length !== 1) {
    return null;
  }

  return data[0];
}

async function getfavoritesByuserId(userId) {
  try {
    const SQL = `
        Select * from favorites WHERE user_id = ${userId};
        `;

    const [data] = await sequelize.query(SQL);
    return data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
}

async function insertUserFavorites(userId, recipeId) {
  try {
    console.log("recipeId: ", recipeId);
    const SQL = `
        INSERT INTO favorites (user_id, recipe_id) VALUES (${userId}, '${recipeId}');
        `;
    console.log("SQL: ", SQL);
    await sequelize.query(SQL);
    return {};
  } catch (error) {
    console.error("Error insert favorites:", error);
  }
}

async function deleteUserFavorites(userId, recipeId) {
  try {
    const SQL = `
    DELETE FROM favorites 
    WHERE user_id =${userId} AND 
          recipe_id = '${recipeId}';`;
    await sequelize.query(SQL);
    return {};
  } catch (error) {
    console.error("Error delete favorites:", error);
  }
}
