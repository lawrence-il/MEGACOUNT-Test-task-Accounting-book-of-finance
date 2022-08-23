import { UserAttr } from "../typesModels";

export {}
declare global {
    namespace Express {
        export interface Request {
            user: UserAttr;
        }
    }
}