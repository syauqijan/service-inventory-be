import express from "express";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
import serviceRoute from "./routes/ServiceRoute.js";
import roleRoute from "./routes/RoleRoute.js";
import dotenv from "dotenv";
import ApiRoute from "./routes/APIRoute.js";
import UnitTestingRoute from "./routes/UnitTestingRoute.js";
import SonarQubeRoute from "./routes/SonarcubeRoute.js";
import ServiceApiRoute from "./routes/ServiceApiRoute.js";
import db from './config/database.js';
import './models/index.js';  
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(roleRoute);
app.use(serviceRoute);
app.use(ApiRoute);
app.use(UnitTestingRoute);
app.use(SonarQubeRoute);
app.use(ServiceApiRoute);

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
