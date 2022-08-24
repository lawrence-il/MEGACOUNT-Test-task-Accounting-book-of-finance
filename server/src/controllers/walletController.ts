import {NextFunction, Request, Response} from 'express';
import { Expense, Revenue, Wallet } from '../models/models.js';
import RequestError from '../error/RequestError.js';

class WalletController {

    async createWallet(req: Request, res: Response) {
        const {name, currentBalance} = req.body;
        const wallet = await Wallet.create({name, currentBalance});
        return res.json(wallet);
    }

    async getAllWallets(req: Request, res: Response) {
        const wallets = await Wallet.findAndCountAll();
        return res.json(wallets);
    }

    async getWallet(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        const wallet = await Wallet.findOne({ 
            where: {id},
            include: [
                {model: Expense, as: 'expense', separate: true, order: [['updatedAt', 'DESC']]}, 
                {model: Revenue, as: 'revenue', separate: true, order: [['updatedAt', 'DESC']]}
            ],
            
        });

        return res.json(wallet);
    }

    async updateWallet(req: Request, res: Response, next: NextFunction) {
        const {id} = req.body;
        const wallet = await Wallet.update(req.body, {where: {id}})
        return res.json(wallet)
    }

    async deleteWallet(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        const wallet = await Wallet.destroy({
            where: {id}
        });
        return res.json(wallet);

    }
}

export default new WalletController()