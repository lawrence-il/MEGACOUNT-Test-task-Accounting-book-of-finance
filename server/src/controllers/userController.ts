import { NextFunction, Request, Response } from "express"
import RequestError from "../error/RequestError.js";

class UserController {
    async registration(req: Request, res: Response) {

    }

    async login(req: Request, res: Response) {

    }

    async checkAuth(req: Request, res: Response, next: NextFunction) {
        const {id} = req.query;
        if(!id) {
            return next(RequestError.badRequest('Отсутствует id'))
        }
        res.json(id);
    }
}

export default new UserController()