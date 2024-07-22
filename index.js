import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";
import db from './config/database.js';
import './models/index.js';  
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await db.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Server is running on port ${PORT}`);
});