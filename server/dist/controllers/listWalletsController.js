import { Op } from 'sequelize';
import { ListWallets, ListWalletsWallet, Wallet } from '../models/models.js';
class ListWalletsController {
    async getListWallet(req, res) {
        const userId = req.user.id;
        const listWallets = await ListWallets.findOne({ where: { UserId: userId } });
        const listWalletId = listWallets.getDataValue('id'); // сделать тип
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
