import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/mongodb.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

await connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to the Imagify Server!");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});