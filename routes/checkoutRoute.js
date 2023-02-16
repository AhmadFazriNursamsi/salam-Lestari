import Express from "express";
import {
    courierCostList,
    airpaypall,
    paymentList,
    tracking,
    paymentCheckout
} from "../controller/checkoutController.js";
import {
    checkAuth
} from "../middleware/auth.js";

const router = Express.Router();

router.post('/checkout/courier-cost/list', checkAuth, courierCostList);
router.get('/checkout/payment/list', checkAuth, paymentList);
router.post('/checkout/payment/checkout', checkAuth, paymentCheckout);
router.post('/checkout/airwaybill', airpaypall);
router.post('/tracking', tracking);



export default router;
