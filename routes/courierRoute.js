import Express from "express";
import {
    createCourier,
    getAllCourier,
    getCourierInfo,
    updateCourier
} from "../controller/courierController.js";
import {
    checkAuth
} from "../middleware/auth.js";

const router = Express.Router();

router.post('/courier/add', checkAuth, createCourier);
router.get('/courier/list', checkAuth, getAllCourier);
router.get('/courier/info/:id', checkAuth, getCourierInfo);
router.post('/courier/update', checkAuth, updateCourier);

export default router;
