import express from "express";
import {
    createServiceApiDetail,
    getServiceApiDetail,
    getApiByServiceId
} from "../controllers/ServiceApiDetailController.js";

const router = express.Router();

router.post('/servicesapidetail', createServiceApiDetail);

router.get('/servicesapidetail', getServiceApiDetail);

router.get('/servicesapidetail/:id', getApiByServiceId);

export default router;