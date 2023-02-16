import Express from "express";
import {
    callbackPayment,
    updateSaldo
} from "../controller/callbackPaymentController.js";

const router = Express.Router();

router.get('/callback/payment/:transaction_id', callbackPayment);
router.get('/updateSaldo/payment', updateSaldo);

export default router;