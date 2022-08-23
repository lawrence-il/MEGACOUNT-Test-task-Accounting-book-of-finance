import Router from "express";
import walletController from "../controllers/walletController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = Router();

router.post('/', checkRoleMiddleware("user"), walletController.createWallet);
router.put('/', checkRoleMiddleware("user"), walletController.updateWallet);
router.delete('/:id', checkRoleMiddleware("user"), walletController.deleteWallet);
router.get('/', checkRoleMiddleware("user"), walletController.getAllWallets);
router.get('/:id', checkRoleMiddleware("user"), walletController.getWallet);

export default router