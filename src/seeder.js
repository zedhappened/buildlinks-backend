import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/index.js';
import users from './data/buildlinks.users.json' assert { type: 'json' };

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
    process.env.MONGODB_URI
).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Seeding data into the database`);

        seed().then(() => {
            console.log("Seeding complete! Press Ctrl + C to exit.")
        })

    });


}).catch(() => {
    console.log("Database connection failed, the server is offline!")
})


const seed = async () => {

    await User.deleteMany({});
    await User.insertMany(users);


}