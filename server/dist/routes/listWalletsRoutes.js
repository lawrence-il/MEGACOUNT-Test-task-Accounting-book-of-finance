import Router from 'express';
import listWalletsController from '../controllers/listWalletsController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { schemaCheckUserId } from '../schema/schemaValidateId.js';
const router = Router();
router.get('/', checkRoleMiddleware('user'), validateRequest(schemaCheckUserId), listWalletsController.getListWallet);
export default router;
