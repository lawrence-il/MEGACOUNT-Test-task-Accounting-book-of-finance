import {Request, Response} from 'express';
import { Revenue } from '../models/models.js';
import RequestError from '../error/RequestError.js';

class revenueController {
    
    async addRevenue(req: Request, res: Response) {
        const {name, value} = req.body;
        const revenue = await Revenue.create({name, value});
        return res.json(revenue);
    }

    async getAllRevenues(req: Request, res: Response) {

    }

    async updateRevenue(req: Request, res: Response) {

    }

    async deleteRevenue(req: Request, res: Response) {

    }
}

export default new revenueController()