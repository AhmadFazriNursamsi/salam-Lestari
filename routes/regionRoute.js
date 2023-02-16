import Express from "express";  
import{
   createData,
   getData,
   getDataprovince,
   getDatadistrict,
   getDataBy,
   updateData
} from "../controller/regionController.js";

const router = Express.Router();

router.post('/region/add', createData);
router.get('/region/cities', getData);
router.get('/region/provinces',getDataprovince);
router.get('/region/district',getDatadistrict);
router.get('/region/', getDataBy);

router.post('/region/update', updateData);

export default router;