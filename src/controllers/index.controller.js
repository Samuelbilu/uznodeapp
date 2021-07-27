const { Pool } = require("pg");

var config = {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_IP || "localhost",
    database: process.env.DB || "postgres",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432
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
        INSERT INTO users (username, password)
        VALUES (${user}, ${pass})
    `)
};

const verifyUser = async (user, pass) => {
    try{
        pool.query(`
            SELECT ${user}, ${pass} FROM users
        `)
    }catch(err){
        console.log("login error")
    }
};

const users = async (req, res) => {
    const response = await pool.query("SELECT * FROM users");
    
    res.send(response)
};


module.exports = {
    createUser,
    verifyUser,
    users
}