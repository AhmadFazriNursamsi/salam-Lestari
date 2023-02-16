import Express from "express";  
import{
    getCarouseis,
    getCarouseisById,
    updateCarouseis,
    deleteCarouseis,
    createCarouseis
} from "../controller/carouseisController.js";


const router = Express.Router();
router.get('/content-service/banner', getCarouseis)
router.post('/content-service/banner', createCarouseis);

router.get('/content-service/banner/:id', getCarouseisById);
router.put('/content-service/banner/:id', updateCarouseis);
router.delete('/content-service/banner/:id', deleteCarouseis);

export default router;