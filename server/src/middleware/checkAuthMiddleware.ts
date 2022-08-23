import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserAttr } from "../types/typesModels";

export default (req: Request, res: Response, next: NextFunction) => {
    if(req.method === 'OPTIONS') {
        next();
    }

    try {
        let token = req.headers.authorization;
        if(!token) {
            return res.status(401).json({message: "Пользователь не авторизован"});
        }
        token = token.split(" ")[1];
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY as string);
        req.user = decodeToken as UserAttr;
        next();
    } catch (error) {
        return res.status(401).json({message: "Пользователь не авторизован"});
    }
}