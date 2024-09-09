import express from "express";
import {
    createSonarqube,
    getSonarqubeById,
    deleteSonarqube,
    updateSonarqube,
} from "../controllers/sonarqubeController.js";

const router = express.Router();

//Creating Sonarqube
router.post('/Sonarqube', createSonarqube);

//Get Sonarqube via ID
router.get('/Sonarqube/:id', getSonarqubeById);

//Delete Sonarqube via ID
router.delete('/Sonarqube/:id', deleteSonarqube);

//Update Sonarqube via ID
router.patch('/Sonarqube/:id', updateSonarqube);

export default router;