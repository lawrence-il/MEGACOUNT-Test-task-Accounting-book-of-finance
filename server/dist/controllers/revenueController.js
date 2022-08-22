import { Revenue } from '../models/models.js';
class revenueController {
    async addRevenue(req, res) {
        const { name, value } = req.body;
        const revenue = await Revenue.create({ name, value });
        return res.json(revenue);
    }
    async getAllRevenues(req, res) {
    }
    async updateRevenue(req, res) {
    }
    async deleteRevenue(req, res) {
    }
}
export default new revenueController();
