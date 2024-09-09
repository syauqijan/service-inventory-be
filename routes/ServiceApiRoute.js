import express from "express";
import {
    createService,
    getService,
    deleteService,
    getServiceById,
    updateService,
    getServiceAPIAll
} from "../controllers/ServiceApiController.js";

const router = express.Router();

router.post('/servicesapi', createService);

router.get('/servicesapi', getService);

router.get('/servicesapiAll', getServiceAPIAll);

router.get('/servicesapi/:id', getServiceById);

router.delete('/servicesapi/:id', deleteService);

router.patch('/servicesapi/:id', updateService);

export default router;