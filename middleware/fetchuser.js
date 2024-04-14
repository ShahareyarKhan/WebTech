const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const JWT_SECRET = 'Harryisagoodb$oy';
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Khan@1234',
    database: 'final_project'
};

const fetchuser = async (req, res, next) => {
    const token = req.header('authorization');
    console.log(token)
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userEmail = decoded.email;
        console.log("User email:", userEmail); 
        // Connect to MySQL database
        const connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [userEmail]);

        // Close the database connection
        await connection.end();
        console.log("User details:", rows);
        if (!rows.length) {
            return res.status(401).send({ error: "User not found" });
        }

        req.user = rows[0];

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;
