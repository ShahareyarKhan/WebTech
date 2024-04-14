const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { connectToMySQL } = require('../models/User');

const JWT_SECRET = 'Harryisagoodb$oy';

router.post('/createuser', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const connection = await connectToMySQL();
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" });
        }

        await connection.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        const authtoken = jwt.sign({ email }, JWT_SECRET);
        res.json({ success: true, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const connection = await connectToMySQL();
        const [rows] = await connection.execute('SELECT * FROM users WHERE Email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const user = rows[0];
        
        if (password !== user.password) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const authtoken = jwt.sign({ email }, JWT_SECRET);

        res.json({ success: true, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
