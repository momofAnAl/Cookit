require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING);

/**
 * Checks user credentials and returns the id of the authenticated user
 * @param {string} username the username
 * @param {string} password the password
 * @returns the id of the user if authenticated, null otherwise
 */
async function authenticate(username, password) {
    const SQL = `
    SELECT id FROM users WHERE username = '${username}' AND password = '${password}';
    `;

    const [data, ] = await sequelize.query(SQL);
    if (data.length !== 1) {
        return null;
    }
    
    return data[0];
}

/**
 * creates a new user with the given username and password
 * @param {string} username the username
 * @param {string} password the password
 */
async function createUser(username, password) {
    const SQL = `
    INSERT INTO users (username, password) VALUES ('${username}', '${password}');
    `;

    const [_, ] = await sequelize.query(SQL);
}

/**
 * gets user information by id
 * @param {number} id the user's id
 * @returns the user's information
 */
async function getUserInfo(id) {
    const SQL = `
    SELECT id, username FROM users WHERE id = ${id};
    `;

    const [data, ] = await sequelize.query(SQL);
    if (data.length !== 1) { 
        return null;
    }

    return data[0];
}