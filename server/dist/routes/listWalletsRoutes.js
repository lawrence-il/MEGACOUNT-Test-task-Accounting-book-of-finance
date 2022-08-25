import Router from 'express';
import listWalletsController from '../controllers/listWalletsController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
const router = Router();
router.get('/', checkRoleMiddleware('user'), listWalletsController.getListWallet);
export default router;
