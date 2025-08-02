import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
connectDB().catch(err => {
    console.error('Database connection failed:', err);
});

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Imagify Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});