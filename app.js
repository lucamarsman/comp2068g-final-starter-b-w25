import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import destinationController from './controllers/destinations.js'
import passport from 'passport';
import Subscriber from './models/subscriber.js'
import cookieParser from 'cookie-parser';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from "dotenv";
dotenv.config();

// CREATE EXPRESS APP
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

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

app.use(passport.initialize());

passport.use(Subscriber.createStrategy())

// Jwt config
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET
}

let strategy = new JwtStrategy(jwtOptions, async(jwt_payload, callback) => {
    try{
        const sub = await Subscriber.findById(jwt_payload.id);
        if(sub){
            return callback(null, sub);
        }
        return callback(null, false);
    }catch(err){
        return callback(err, false);
    }
});

passport.use(strategy);

app.use('/v1/api/destinations', destinationController);

// RUN SERVER
app.listen(3000, () => {
    console.log('Final Exam API running on port 3000');
});