import express from "express";
import {
    createSonarqube,
    getSonarqubeById,
    deleteSonarqube,
    updateSonarqube
} from "../controllers/sonarqubeController.js";

const router = express.Router();

//Creating Api
router.post('/Sonarqube', createSonarqube);

//Get API via ID
router.get('/Sonarqube/:id', getSonarqubeById);

//Delete API via ID
router.delete('/Sonarqube/:id', deleteSonarqube);

//Update API via ID
router.patch('/Sonarqube/:id', updateSonarqube);

export default router;