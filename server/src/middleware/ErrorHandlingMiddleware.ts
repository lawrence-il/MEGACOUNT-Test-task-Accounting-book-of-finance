import { NextFunction, Request, Response } from "express";
import RequestError from "../error/RequestError.js";

export default (error: RequestError, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof RequestError) {
        return res.status(error.status).json({message: error.message})
    }
    return res.status(500).json("Неожиданная ошибка") 
}