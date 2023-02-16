import Express from "express";
import {
   createCategory,
   getAllCategory,
   getCategoryInfo,
   deleteCategory,
   updateCategory
} from "../controller/categoryController.js";
import {
   checkAuth
} from "../middleware/auth.js";

const router = Express.Router();

router.post('/category/add', checkAuth, createCategory);
router.get('/category/list', checkAuth, getAllCategory);
router.get('/category/info/:id', checkAuth, getCategoryInfo);
router.post('/category/update', checkAuth, updateCategory);
router.post('/category/delete/:category_id', deleteCategory);


export default router;