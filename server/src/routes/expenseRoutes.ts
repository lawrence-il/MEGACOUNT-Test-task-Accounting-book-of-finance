import Router from "express";
import expenseController from "../controllers/expenseController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = Router();

router.post('/', checkRoleMiddleware("user"), expenseController.addExpense);
router.get('/', checkRoleMiddleware("user"), expenseController.getAllExpense);
router.put('/', checkRoleMiddleware("user"), expenseController.updateExpense);
router.delete('/:id', checkRoleMiddleware("user"), expenseController.deleteExpense);


export default router