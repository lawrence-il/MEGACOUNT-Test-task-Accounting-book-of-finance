import { Expense } from '../models/models.js';
import RequestError from '../error/RequestError.js';
class ExpenseController {
    async addExpense(req, res, next) {
        try {
            const { name, value, WalletId } = req.body;
            const expense = await Expense.create({ name, value, WalletId });
            return res.json(expense);
        }
        catch (error) {
            if (error instanceof RequestError) {
                next(RequestError.badRequest(error.message));
            }
        }
    }
    async getAllExpense(req, res, next) {
        let { WalletId, limit, sort } = req.query;
        let expenses;
        if (!sort)
            sort = 'DESC';
        if (sort !== 'DESC' && sort !== 'ASC') {
            return next(RequestError.badRequest('Неправильный  параметр sort'));
        }
        if (!WalletId) {
            return next(RequestError.badRequest('Отсутствует WalletId'));
        }
        if (!limit) {
            expenses = await Expense.findAndCountAll({ where: { WalletId: +WalletId }, order: [['updatedAt', sort]] });
        }
        else {
            expenses = await Expense.findAndCountAll({ where: { WalletId: +WalletId }, limit: +limit, order: [['updatedAt', sort]] });
        }
        return res.json(expenses);
    }
    async updateExpense(req, res, next) {
        const { id } = req.body;
        if (!id) {
            return next(RequestError.badRequest('Отсутствует id'));
        }
        const expense = await Expense.update(req.body, { where: { id } });
        return res.json(expense);
    }
    async deleteExpense(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(RequestError.badRequest('Отсутствует id'));
        }
        const expense = await Expense.destroy({
            where: { id }
        });
        return res.json(expense);
    }
}
export default new ExpenseController();
