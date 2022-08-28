import Router from 'express';
import expenseController from '../controllers/expenseController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { schemaDeleteValidateId, schemaUpdateValidateId } from '../schema/schemaValidateId.js';
import { schemaValidateBalance, schemaValidateWalletId } from '../schema/schemeValidateBalance.js';

const router = Router();

router.post(
    '/',
    checkRoleMiddleware('user'),
    validateRequest(schemaValidateWalletId),
    expenseController.addExpense,
);
router.get(
    '/',
    checkRoleMiddleware('user'),
    validateRequest(schemaValidateBalance),
    expenseController.getAllExpense,
);
router.put(
    '/',
    checkRoleMiddleware('user'),
    validateRequest(schemaUpdateValidateId),
    expenseController.updateExpense,
);
router.delete(
    '/:id',
    checkRoleMiddleware('user'),
    validateRequest(schemaDeleteValidateId),
    expenseController.deleteExpense,
);

export default router;
