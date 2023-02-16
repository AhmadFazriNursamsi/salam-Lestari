import Express from "express";  
import{
   createStore,
   getAllStore,
   getStoreInfo,
   updateStore
} from "../controller/storeController.js";
import {
   checkAuth
} from "../middleware/auth.js";

const router = Express.Router();

router.post('/store/add', checkAuth, createStore);
router.get('/store/list', checkAuth, getAllStore);
router.get('/store/info/:id', checkAuth, getStoreInfo);
router.post('/store/update', checkAuth, updateStore);

export default router;