import express from "express";
import {
    getAPI,
    createAPI,
    getApiById,
    deleteAPI,
    updateAPI
} from "../controllers/APIController.js";

const router = express.Router();

//Creating Api
router.post('/api', createAPI);

//Api Get All Detail
router.get('/api', getAPI);

//Get API via ID
router.get('/api/:id', getApiById);

//Delete API via ID
router.delete('/api/:id', deleteAPI);

//Update API via ID
router.patch('/api/:id', updateAPI);

export default router;