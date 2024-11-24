import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './route/UserRoute.js';
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5174", // Allow requests from localhost:5173
    credentials: true, // Enable sending cookies with requests
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

// Routes
app.use("/api/auth", userRouter);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is up & running on port ${process.env.PORT} ✅`);
});
