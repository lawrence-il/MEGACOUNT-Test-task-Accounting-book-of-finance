import Router from "express";
import walletController from "../controllers/walletController.js";
const router = Router();
router.post('/', walletController.createWallet);
router.put('/', walletController.updateWallet);
router.delete('/:id', walletController.deleteWallet);
router.get('/', walletController.getAllWallets);
router.get('/:id', walletController.getWallet);
export default router;
