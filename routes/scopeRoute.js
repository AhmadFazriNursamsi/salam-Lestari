import Express from "express";  
import{
    getScopes,
    getScopesById,
    updateScopes,
    deleteScopes,
    createScopes
} from "../controller/scopesController.js";

const router = Express.Router();

router.get('/scopes', getScopes);
router.get('/scopes/:id', getScopesById);
router.post('/scopes', createScopes);
router.patch('/scopes/:id', updateScopes);
router.delete('/scopes/:id', deleteScopes);

export default router;