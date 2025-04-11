import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'

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

// RUN SERVER
app.listen(3000, () => {
    console.log('Final Exam API running on port 3000');
});