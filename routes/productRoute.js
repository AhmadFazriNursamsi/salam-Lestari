import Express from "express";  
import{
   createProduct,
   getAllProduct,
   getProductInfo,
   getProductInfoStore,
   getProductdelete,
   updateProduct
} from "../controller/productController.js";
import {
   checkAuth
} from "../middleware/auth.js";

const router = Express.Router();

router.post('/product/add', checkAuth, createProduct);
router.get('/product/list', checkAuth, getAllProduct);
router.get('/product/info/:id', checkAuth, getProductInfo);
router.get('/product/info/store/:id', getProductInfoStore);
router.post('/product/delete/:id', getProductdelete);
router.post('/product/update', checkAuth, updateProduct);

export default router;