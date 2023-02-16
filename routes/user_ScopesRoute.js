import Express from "express";  
import{
    getUser_Scope,
    getUser_ScopeById,
    updateUser_Scope,
    deleteUser_Scope,
    createUser_Scope
} from "../controller/user_ScopesController.js";

const router = Express.Router();

router.get('/profile', getUser_Scope);
router.get('/profile/:id', getUser_ScopeById);
router.post('/profile', createUser_Scope);
router.patch('/profile/:id', updateUser_Scope);
router.delete('/profile/:id', deleteUser_Scope);

export default router;