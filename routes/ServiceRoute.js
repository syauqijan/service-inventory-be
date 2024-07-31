import express from "express";
import {
    createService,
    getService,
    getServiceById,
    deleteService,
    updateService
} from "../controllers/ServiceController.js";

const router = express.Router();

//Creating Service
router.post('/services', createService);

//Delete Service Via ID
router.delete('/services/:id', deleteService);

//Update Service Via ID
router.patch('/services/:id', updateService);

//Service Get All Detail
router.get('/services', getService);

//Service Detail Via ID
router.get('/services/:id', getServiceById);


export default router;