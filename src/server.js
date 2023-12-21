import "express-async-errors";

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import corsOptions from './config/corsOptions.config.js';
import authMiddleware from './middlewares/auth.middleware.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import fallbackRoute from './routes/fallback.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware to add userId to the request
app.use(authMiddleware)

// app routes
app.use('/user', userRouter)

// fallback route to catch unmatched routes
app.use(fallbackRoute)

// middleware~interceptor to handle errors
app.use(errorHandler)

mongoose.connect(
    process.env.MONGODB_URI
).then(() => {
    app.listen(process.env.PORT, () => {
        if (process.env.NODE_ENV == "development")
            console.log(`Server is running at http://localhost:${process.env.PORT}`);
        else
            console.log("Server is live!")
    });
}).catch(() => {
    console.log("Database connection failed, the server is offline!")
})