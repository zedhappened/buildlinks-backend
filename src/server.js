import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use(

// )

// middleware to add userId to the request
//app.use(authMiddleware)

// app routes
//app.use('/user', userRouter)

// fallback route to catch unmatched routes
//app.use(fallbackRoute)

// middleware~interceptor to handle errors
//app.use(errorHandler)

mongoose.connect(
    process.env.MONGODB_URI
).then(() => {
    app.listen(port, () => {
        if (process.env.NODE_ENV == "development")
            console.log(`Server is running at http://localhost:${port}`);
        else
            console.log("Server is live!")
    });
}).catch(() => {
    console.log("Database connection failed, the server is offline!")
})