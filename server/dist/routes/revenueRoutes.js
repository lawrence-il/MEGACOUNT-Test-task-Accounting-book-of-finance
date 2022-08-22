import Router from "express";
import revenueController from "../controllers/revenueController.js";
const router = Router();
router.post('/', revenueController.addRevenue);
router.get('/', revenueController.getAllRevenues);
router.put('/', revenueController.updateRevenue);
router.delete('/:id', revenueController.deleteRevenue);
export default router;
