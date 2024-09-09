import express from "express";
import {
    createUnitTesting,
    getUnitTestingById,
    deleteUnitTesting,
    updateUnitTesting,
    getUnitTesting
} from "../controllers/UnitTestingController.js";

const router = express.Router();

//Creating Api
router.post('/unitTesting', createUnitTesting);

//Get API via ID getUnitTesting
router.get('/unitTesting', getUnitTesting);

//Get API via ID 
router.get('/unitTesting/:id', getUnitTestingById);

//Delete API via ID
router.delete('/unitTesting/:id', deleteUnitTesting);

//Update API via ID
router.patch('/unitTesting/:id', updateUnitTesting);

export default router;