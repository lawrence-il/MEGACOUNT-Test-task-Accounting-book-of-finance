import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserAttr } from "../types/typesModels";

export default (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(req.method === 'OPTIONS') {
            next();
        }
    
        try {
            let token = req.headers.authorization;
            if(!token) {
                return res.status(401).json({message: "Пользователь не авторизован"});
            }
            token = token.split(" ")[1];
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY as string) as UserAttr;
            if(decodeToken.role !== role) {
                return res.status(403).json({message: "Доступ запрещён"});
            }
            req.user = decodeToken;
            next();
        } catch (error) {
            return res.status(401).json({message: "Пользователь не авторизован"});
        }
    }
}

