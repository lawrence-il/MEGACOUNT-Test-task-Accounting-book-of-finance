import Router from "express";
import expenseController from "../controllers/expenseController.js";
const router = Router();
router.post('/', expenseController.addExpense);
router.get('/', expenseController.getAllExpense);
router.put('/', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);
export default router;
