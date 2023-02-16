import Express from "express";  
import{
   createCart,
   getCartInfo,
   updateQuantityCart,
   updateNoteCart,
   deleteCart
} from "../controller/shoppingCartController.js";
import {
   checkAuth
} from "../middleware/auth.js";

const router = Express.Router();

router.post('/buyer/cart/add', checkAuth, createCart);
router.get('/buyer/cart/info', checkAuth, getCartInfo);
router.post('/buyer/cart/update/quantity', checkAuth, updateQuantityCart);
router.post('/buyer/cart/update/note', checkAuth, updateNoteCart);
router.post('/buyer/cart/delete', checkAuth, deleteCart);

export default router;