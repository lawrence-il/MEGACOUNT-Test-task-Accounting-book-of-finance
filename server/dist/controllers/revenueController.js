import { Revenue } from '../models/models.js';
import RequestError from '../error/RequestError.js';
class RevenueController {
    async addRevenue(req, res, next) {
        try {
            const { name, value, WalletId } = req.body;
            const revenue = await Revenue.create({ name, value, WalletId });
            return res.json(revenue);
        }
        catch (error) {
            if (error instanceof RequestError) {
                next(RequestError.badRequest(error.message));
            }
        }
    }
    async getAllRevenues(req, res, next) {
        let { WalletId, limit, sort } = req.query;
        let revenues;
        if (!sort)
            sort = 'DESC';
        if (sort !== 'DESC' && sort !== 'ASC') {
            return next(RequestError.badRequest('Неправильный  параметр sort'));
        }
        if (!WalletId) {
            return next(RequestError.badRequest('Отсутствует WalletId'));
        }
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
        if (!id) {
            return next(RequestError.badRequest('Отсутствует id'));
        }
        const revenue = await Revenue.update(req.body, { where: { id } });
        return res.json(revenue);
    }
    async deleteRevenue(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(RequestError.badRequest('Отсутствует id'));
        }
        const revenue = await Revenue.destroy({
            where: { id }
        });
        return res.json(revenue);
    }
}
export default new RevenueController();
