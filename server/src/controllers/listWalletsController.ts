import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import RequestError from '../error/RequestError.js';
import { ListWallets, ListWalletsWallet, Wallet } from '../models/models.js';

class ListWalletsController {
    async getListWallet(req: Request, res: Response, next: NextFunction) {
        const userId = req.user.id;
        const listWallets = await ListWallets.findOne({ where: { UserId: userId } });
        if(!listWallets) {
            return next(RequestError.internal('Не найдена запись в таблице'));
        }
        const listWalletId = listWallets.getDataValue('id'); 
        const walletIds = await ListWalletsWallet.findAndCountAll({
            attributes: ['WalletId'],
            where: { ListWalletId: listWalletId },
        });
        const wallets = await Wallet.findAndCountAll({
            where: {
                id: { [Op.or]: walletIds.rows.map((obj) => obj.getDataValue("WalletId")) },
            },
        });

        res.json(wallets);
    }
}

export default new ListWalletsController();
