const { Pool } = require("pg");

var config = {
    user: process.env.DB_USER,
    host: process.env.DB_IP,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

const pool = new Pool(config);

pool.query(`
    CREATE TABLE [IF NOT EXISTS] users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(40)
    );
`)

const createUser = async (user, pass) => {
    pool.query(`
        INSERT INTO table_name (username, password)
        VALUES ($1, $2)
    `, [user, pass])
};

const verifyUser = async (user, pass) => {
    try{
        pool.query(`
            SELECT $1, $2 FROM users
        `, [user, pass])
    }catch(err){
        console.log("login error")
    }
};

module.exports = {
    createUser,
    verifyUser
}