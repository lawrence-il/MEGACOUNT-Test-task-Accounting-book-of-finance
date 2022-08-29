import { Revenue, Wallet } from '../models/models.js';
import RequestError from '../error/RequestError.js';
class RevenueController {
    async addRevenue(req, res, next) {
        try {
            const { name, value, WalletId } = req.body;
            const revenue = await Revenue.create({ name, value, WalletId });
            const wallet = await Wallet.findOne({
                where: { id: revenue.getDataValue("WalletId") },
            });
            if (!wallet) {
                console.log({ message: "Такого кошелька нет" });
                return;
            }
            ;
            await Wallet.update({
                id: revenue.getDataValue("WalletId"),
                name: wallet.getDataValue("name"),
                value: wallet.getDataValue("value") + revenue.getDataValue("value")
            }, {
                where: { id: revenue.getDataValue("WalletId") },
            });
            return res.json(revenue);
        }
        catch (error) {
            if (error instanceof RequestError) {
                return next(RequestError.badRequest(error.message));
            }
        }
    }
    async getAllRevenues(req, res, next) {
        let { WalletId, limit, sort } = req.query;
        let revenues;
        if (!limit) {
            revenues = await Revenue.findAndCountAll({ where: { WalletId: +WalletId }, order: [['updatedAt', sort]] });
        }
        else {
            revenues = await Revenue.findAndCountAll({ where: { WalletId: +WalletId }, limit: +limit, order: [['updatedAt', sort]] });
        }
        return res.json(revenues);
    }
    async updateRevenue(req, res, next) {
        const { id } = req.body;
        const oldValueRev = await Revenue.findOne({ where: { id } });
        const revenue = await Revenue.update(req.body, { where: { id } });
        if (!oldValueRev) {
            console.log({ message: "Такого расхода нет" });
            return;
        }
        ;
        const wallet = await Wallet.findOne({
            where: { id: oldValueRev.getDataValue("WalletId") },
        });
        if (!wallet) {
            console.log({ message: "Такого кошелька нет" });
            return;
        }
        ;
        await Wallet.update({
            id: wallet.getDataValue("id"),
            name: wallet.getDataValue("name"),
            value: wallet.getDataValue("value") - oldValueRev.getDataValue("value") + +req.body.value
        }, {
            where: { id: oldValueRev.getDataValue("WalletId") },
        });
        return res.json(revenue);
    }
    async deleteRevenue(req, res, next) {
        const { id } = req.params;
        const revenue = await Revenue.destroy({
            where: { id }
        });
        return res.json(revenue);
    }
}
export default new RevenueController();
