import "express-async-errors";

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import corsOptions from './config/corsOptions.config.js';
import { authMiddleware, errorHandler } from './middlewares';
import { categoryRouter, colorRouter, fallbackRoute, userRouter } from './routes';

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: '35mb' }));
app.use(express.urlencoded({ extended: true, limit: '35mb', parameterLimit: 50000, }));

// middleware to add userId to the request
app.use(authMiddleware)

// app routes
app.use('/user', userRouter)
app.use('/color', colorRouter)
app.use('/category', categoryRouter)

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