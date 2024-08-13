import express from "express";
import {
    createService,
    getService,
    deleteService,
    getServiceById
} from "../controllers/ServiceApiController.js";

const router = express.Router();

router.post('/servicesapi', createService);

router.get('/servicesapi', getService);

router.get('/servicesapi/:id', getServiceById);

router.delete('/servicesapi/:id', deleteService);

export default router;