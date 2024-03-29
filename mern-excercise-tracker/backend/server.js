const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const excercisesRouter = require('./routes/excercises');
const usersRoutes = require('./routes/users');

app.use('/excercises', excercisesRouter);
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
