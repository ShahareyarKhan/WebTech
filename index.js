const express = require('express');
const { connectToMySQL } = require('./db');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Connect to MySQL database
connectToMySQL().catch(err => console.error("MySQL connection error"));

app.get('/', (req, res) => {
  res.send('hello world');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
