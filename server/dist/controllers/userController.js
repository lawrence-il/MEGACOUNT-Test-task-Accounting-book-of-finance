import RequestError from "../error/RequestError.js";
class UserController {
    async registration(req, res) {
    }
    async login(req, res) {
    }
    async checkAuth(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(RequestError.badRequest('Отсутствует id'));
        }
        res.json(id);
    }
}
export default new UserController();
