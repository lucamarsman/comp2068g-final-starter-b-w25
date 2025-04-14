import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import destinationController from './controllers/destinations.js'
import dotenv from "dotenv";
dotenv.config();

// CREATE EXPRESS APP
const app = express();

app.use(bodyParser.json());

// DB CONN
mongoose.connect(process.env.DB, {})
.then((res) => console.log('Connected to MongoDB'))
.catch((err) => console.log(`Connection Failure: ${err}`));

// ANGULAR ACCESS
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use('/v1/api/destinations', destinationController);

// RUN SERVER
app.listen(3000, () => {
    console.log('Final Exam API running on port 3000');
});