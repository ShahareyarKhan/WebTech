const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { connectToMySQL } = require('../models/User');

const JWT_SECRET = 'Harryisagoodb$oy';

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.get('/fetchallnotes', verifyToken, async (req, res) => {
    const { email } = req.user; // Accessing user email
    try {
        const connection = await connectToMySQL(); // Assuming connectToMySQL connects to the users table
        const [userRows] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]); // Find user's ID
        if (userRows.length === 0) {
            return res.status(404).send("User not found.");
        }
        const userId = userRows[0].id;

        const notesConnection = await connectToMySQL(); // Assuming connectToMySQL2 connects to the notes table
        const [notesRows] = await notesConnection.execute('SELECT * FROM notes WHERE user_id = ?', [userId]);
        res.json(notesRows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred.");
    }
});

router.post('/addnote', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    const { email } = req.user;
    try {
        // Retrieve the user's ID using their email
        const connection = await connectToMySQL();
        const [userRows] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (userRows.length === 0) {
            return res.status(404).send("User not found.");
        }
        const userId = userRows[0].id;

        // Insert the note into the database with the user's ID
        const notesConnection = await connectToMySQL(); // Assuming connectToMySQL2 connects to the notes table
        await notesConnection.execute('INSERT INTO notes (user_id, title, description) VALUES (?, ?,  ?)', [userId, title, description]);

        res.json({ success: true, message: 'Note added successfully.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred.");
    }
});

router.put('/updatenote/:id', verifyToken, async (req, res) => {
    const { title, description, tag } = req.body; // Include 'tag' variable
    const { email } = req.user;
    const noteId = req.params.id;
    try {
        const connection = await connectToMySQL();
        const [rows] = await connection.execute('SELECT * FROM notes WHERE id = ?', [noteId]);
        if (rows.length === 0) {
            return res.status(404).send("Note not found.");
        }
        const note = rows[0];
        if (note.user_email !== email) {
            return res.status(401).send("Not allowed to update this note.");
        }
        await connection.execute('UPDATE notes SET title = ?, description = ?, tag = ? WHERE id = ?', [title, description, tag, noteId]);
        res.json({ success: true, message: 'Note updated successfully.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred.");
    }
});

router.delete('/deletenote/:id', verifyToken, async (req, res) => {
    const { email } = req.user;
    const noteId = req.params.id;
    try {
        const connection = await connectToMySQL();
        const [rows] = await connection.execute('SELECT * FROM notes WHERE id = ?', [noteId]);
        if (rows.length === 0) {
            return res.status(404).send("Note not found.");
        }
        const note = rows[0];
        if (note.user_email !== email) {
            return res.status(401).send("Not allowed to delete this note.");
        }
        await connection.execute('DELETE FROM notes WHERE id = ?', [noteId]);
        res.json({ success: true, message: 'Note deleted successfully.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurred.");
    }
});


module.exports = router;
