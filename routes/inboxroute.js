import Express from "express";  
import{
    getInbox,
    getInboxById,
    updateInbox,
    deleteInbox,
    createInbox
} from "../controller/inboxController.js";

const router = Express.Router();

router.get('/inbox', getInbox);
router.get('/inbox/:id', getInboxById);
router.post('/data/inbox', createInbox);
router.patch('/inbox/:id', updateInbox);
router.delete('/inbox/:id', deleteInbox);

export default router;