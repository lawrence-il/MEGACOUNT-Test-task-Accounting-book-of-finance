import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";


const validateRequest = (schema: AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.query)
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params,
                user: req.user
            });
            next();
        } catch (error) {
            if( error instanceof Error) {
                return res.status(404).json({message: error.message})
            }
        }
    }
}

export default validateRequest