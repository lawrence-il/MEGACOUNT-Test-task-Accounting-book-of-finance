import { Expense, Revenue, Wallet } from '../models/models.js';
class WalletController {
    async createWallet(req, res) {
        const { name, currentBalance } = req.body;
        const wallet = await Wallet.create({ name, currentBalance });
        return res.json(wallet);
    }
    async getAllWallets(req, res) {
        const wallets = await Wallet.findAndCountAll();
        return res.json(wallets);
    }
    async getWallet(req, res, next) {
        const { id } = req.params;
        const wallet = await Wallet.findOne({
            where: { id },
            include: [
                { model: Expense, as: 'expense', separate: true, order: [['updatedAt', 'DESC']] },
                { model: Revenue, as: 'revenue', separate: true, order: [['updatedAt', 'DESC']] }
            ],
        });
        return res.json(wallet);
    }
    async updateWallet(req, res, next) {
        const { id } = req.body;
        const wallet = await Wallet.update(req.body, { where: { id } });
        return res.json(wallet);
    }
    async deleteWallet(req, res, next) {
        const { id } = req.params;
        const wallet = await Wallet.destroy({
            where: { id }
        });
        return res.json(wallet);
    }
}
export default new WalletController();
