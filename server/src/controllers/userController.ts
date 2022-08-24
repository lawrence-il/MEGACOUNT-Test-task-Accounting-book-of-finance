import { NextFunction, Request, Response } from 'express';
import RequestError from '../error/RequestError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, ListWallets } from '../models/models.js';

const generateToken = (id: number, role: string) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY as string, { expiresIn: '24h' });
};

class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        const { login, password, role } = req.body;
        const check = await User.findOne({ where: { login } });
        if (check) {
            return next(RequestError.badRequest('Такой пользователь уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({ login, password: hashPassword, role });
        const listWallets = await ListWallets.create({ UserId: user.getDataValue('id') });
        const tokenJwt = generateToken(user.getDataValue('id'), role);

        return res.json({ token: tokenJwt });
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login } });
        if(!user) {
            return next(RequestError.badRequest('Неверный логин или пароль'));
        }
        let comparePassword = await bcrypt.compare(password, user.getDataValue("password"));
        if(!comparePassword) {
            return next(RequestError.badRequest('Неверный логин или пароль'));
        }
        const tokenJwt = generateToken(user.getDataValue('id'), user.getDataValue('role'));
        return res.json({ token: tokenJwt });
    }

    async getNewToken(req: Request, res: Response, next: NextFunction) {
        const token = generateToken(req.user.id, req.user.role);
        return res.json({token})
    }
}

export default new UserController();
