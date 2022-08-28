import {NextFunction, Request, Response} from 'express';
import { Expense } from '../models/models.js';
import RequestError from '../error/RequestError.js';

class ExpenseController {

    async addExpense(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, value, WalletId} = req.body;
            const expense = await Expense.create({name, value, WalletId});
            return res.json(expense);
        } catch (error) {
            if(error instanceof RequestError) {
                return next(RequestError.badRequest(error.message));
            }
        }
    }

    async getAllExpense(req: Request, res: Response, next: NextFunction) {//
        let {WalletId, limit, sort} = req.query;
        let expenses;
        if(!limit) {
            expenses = await Expense.findAndCountAll({where: {WalletId: +WalletId!}, order: [['updatedAt', sort as string]]});
        } else {
            expenses = await Expense.findAndCountAll({where: {WalletId: +WalletId!}, limit: +limit, order: [['updatedAt', sort as string]]});
        }
        return res.json(expenses);
    }

    async updateExpense(req: Request, res: Response, next: NextFunction) {
        const {id} = req.body;
        const expense = await Expense.update(req.body, {where: {id}})
        return res.json(expense)
    }

    async deleteExpense(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        const expense = await Expense.destroy({
            where: {id}
        });
        return res.json(expense);

    }
}

export default new ExpenseController()