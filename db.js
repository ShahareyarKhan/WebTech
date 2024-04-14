const mysql = require('mysql2/promise');

async function connectToMySQL() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Khan@1234',
    database: 'final_project'
  });

  console.log("Successfully Connected to MySQL.");

  return connection;
}

module.exports = {connectToMySQL};
