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

async function createNoteTable() {
  try {
    const connection = await connectToMySQL();
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("Note table created successfully.");
  } catch (error) {
    console.error("Error creating note table:", error);
  }
}

module.exports = {
  createNoteTable
};
