import express from "express";
import {
    createService,
    getService,
    getServiceById,
    deleteService,
    updateService
} from "../controllers/ServiceController.js";

const router = express.Router();

router.post('/services', createService);

router.delete('/services', deleteService);

router.patch('/services/:id', updateService);

router.get('/services', getService);

router.get('/services/:id', getServiceById);


export default router;