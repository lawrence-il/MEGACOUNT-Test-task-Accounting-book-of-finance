import { NextFunction, Request, Response } from 'express';
import RequestError from '../error/RequestError.js';
import { Expense, ListWallets, ListWalletsWallet, Revenue, Wallet } from '../models/models.js';

class WalletController {
    async createWallet(req: Request, res: Response, next: NextFunction) {
        const { name, value } = req.body;
        const userId = req.user.id;
        const wallet = await Wallet.create({ name, value });
        const listWallets = await ListWallets.findOne({ where: { UserId: userId } });
        if (!listWallets) {
            return next(RequestError.internal('Не найдена запись в таблице'));
        }
        const listWalletWallets = await ListWalletsWallet.create({
            ListWalletId: listWallets.getDataValue('id'),
            WalletId: wallet.getDataValue('id'),
        });
        return res.json(wallet);
    }

    async getAllWallets(req: Request, res: Response) {//
        const wallets = await Wallet.findAndCountAll();
        return res.json(wallets);
    }

    async getWallet(req: Request, res: Response) {//
        const { id } = req.params;

        const wallet = await Wallet.findOne({
            where: { id },
            include: [
                { model: Expense, as: 'expense', separate: true, order: [['updatedAt', 'DESC']] },
                { model: Revenue, as: 'revenue', separate: true, order: [['updatedAt', 'DESC']] },
            ],
        });

        return res.json(wallet);
    }

    async updateWallet(req: Request, res: Response) {
        const { id } = req.body;
        const wallet = await Wallet.update(req.body, { where: { id } });
        return res.json(wallet);
    }

    async deleteWallet(req: Request, res: Response) {
        const { id } = req.params;
        await Revenue.destroy({where: {WalletId: id}});
        await Expense.destroy({where: {WalletId: id}});
        await ListWalletsWallet.destroy({where: {WalletId: id}});
        const wallet = await Wallet.destroy({
            where: { id },
        });
        return res.json(wallet);
    }
}

export default new WalletController();
