import Router from "express";
import userController from "../controllers/userController.js";
import checkAuthMiddleware from "../middleware/checkAuthMiddleware.js";
const router = Router();
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', checkAuthMiddleware, userController.getNewToken);
export default router;
