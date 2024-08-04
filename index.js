const express = require('express');
const ConnectDB = require('./config/db');
const cors = require('cors');
const userRouter = require('./Router/Router');
const dotenv = require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('This is our Home Route');
});

// Start server and connect to DB
const PORT = process.env.PORT || 5000; // Use a default port if not specified

app.listen(PORT, async () => {
    try {
        await ConnectDB;
        console.log(`Server is running on port ${PORT} and DB is connected`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit process with failure
    }
});
