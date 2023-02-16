import Express from "express";  
import{
    getData,
    getDataById,
    updateData,
    deleteData,
    createData,
    createSos,
    createInbox,
    getNearme,
    getInbox,
    media,
    getcount,
    updateinbox
} from "../controller/dataController.js";

const router = Express.Router();

router.get('/data', getData);
router.post('/data/user', createData);
router.post('/data/sos', createSos);

router.post('/data/inbox', createInbox);
router.get('/data/inbox', getInbox);
router.get('/data/inbox-count', getcount);
router.post('/media', media);
router.put('/data/inbox/:inbox_id', updateinbox);
router.get('/nearme/', getNearme);




export default router;