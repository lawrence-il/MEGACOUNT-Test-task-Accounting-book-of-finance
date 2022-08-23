import Router from "express";
import revenueController from "../controllers/revenueController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = Router();
router.post('/', checkRoleMiddleware("user"), revenueController.addRevenue);
router.get('/', checkRoleMiddleware("user"), revenueController.getAllRevenues);
router.put('/', checkRoleMiddleware("user"), revenueController.updateRevenue);
router.delete('/:id', checkRoleMiddleware("user"), revenueController.deleteRevenue);
export default router;
