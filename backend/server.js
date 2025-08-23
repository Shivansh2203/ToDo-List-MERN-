require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

const port = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});