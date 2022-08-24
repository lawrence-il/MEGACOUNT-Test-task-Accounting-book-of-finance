import Router from 'express';
import walletController from '../controllers/walletController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import {
    schemaDeleteValidateId,
    schemaUpdateValidateId,
} from '../schema/schemaValidateId.js';

const router = Router();

router.post('/', checkRoleMiddleware('user'), walletController.createWallet);
router.put(
    '/',
    checkRoleMiddleware('user'),
    validateRequest(schemaUpdateValidateId),
    walletController.updateWallet,
);
router.delete(
    '/:id',
    checkRoleMiddleware('user'),
    validateRequest(schemaDeleteValidateId),
    walletController.deleteWallet,
);
router.get('/', checkRoleMiddleware('user'), walletController.getAllWallets);
router.get('/:id', checkRoleMiddleware('user'), walletController.getWallet);

export default router;
