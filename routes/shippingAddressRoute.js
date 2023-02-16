import Express from "express";  
import {
    createShippingAddress,
    getAllShippingAddress,
    getShippingAddressInfo,
    updateShippingAddress,
    deleteShippingAddress
} from "../controller/shippingAddressController.js";
import {
    checkAuth
} from "../middleware/auth.js";

const router = Express.Router();

router.post('/buyer/shipping-address/add', checkAuth, createShippingAddress);
router.get('/buyer/shipping-address/list', checkAuth, getAllShippingAddress);
router.get('/buyer/shipping-address/info/:id', checkAuth, getShippingAddressInfo);
router.post('/buyer/shipping-address/update', checkAuth, updateShippingAddress);
router.post('/buyer/shipping-address/delete', checkAuth, deleteShippingAddress);

export default router;