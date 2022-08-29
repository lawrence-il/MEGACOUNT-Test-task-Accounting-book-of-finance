import { Expense, Wallet } from '../models/models.js';
import RequestError from '../error/RequestError.js';
class ExpenseController {
    async addExpense(req, res, next) {
        try {
            const { name, value, WalletId } = req.body;
            const expense = await Expense.create({ name, value, WalletId });
            const wallet = await Wallet.findOne({
                where: { id: expense.getDataValue("WalletId") },
            });
            if (!wallet) {
                console.log({ message: "Такого кошелька нет" });
                return;
            }
            ;
            await Wallet.update({
                id: expense.getDataValue("WalletId"),
                name: wallet.getDataValue("name"),
                value: wallet.getDataValue("value") - expense.getDataValue("value")
            }, {
                where: { id: expense.getDataValue("WalletId") },
            });
            return res.json(expense);
        }
        catch (error) {
            if (error instanceof RequestError) {
                return next(RequestError.badRequest(error.message));
            }
        }
    }
    async getAllExpense(req, res, next) {
        let { WalletId, limit, sort } = req.query;
        let expenses;
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
        const oldValueExp = await Expense.findOne({ where: { id } });
        const expense = await Expense.update(req.body, { where: { id } });
        if (!oldValueExp) {
            console.log({ message: "Такого расхода нет" });
            return;
        }
        ;
        const wallet = await Wallet.findOne({
            where: { id: oldValueExp.getDataValue("WalletId") },
        });
        if (!wallet) {
            console.log({ message: "Такого кошелька нет" });
            return;
        }
        ;
        await Wallet.update({
            id: wallet.getDataValue("id"),
            name: wallet.getDataValue("name"),
            value: wallet.getDataValue("value") + oldValueExp.getDataValue("value") - +req.body.value //  value: wallet.getDataValue("value") - oldValueExp.getDataValue("value") + +req.body.value
        }, {
            where: { id: oldValueExp.getDataValue("WalletId") },
        });
        return res.json(expense);
    }
    async deleteExpense(req, res, next) {
        const { id } = req.params;
        const expense = await Expense.destroy({
            where: { id }
        });
        return res.json(expense);
    }
}
export default new ExpenseController();
