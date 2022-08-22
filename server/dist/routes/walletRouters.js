import Router from "express";
import walletController from "../controllers/walletController.js";
const router = Router();
router.post('/', walletController.createWallet); //cr
router.put('/:id', walletController.updateWallet); // upd
router.delete('/:id', walletController.deleteWallet); //del
router.get('/', walletController.getAllWallets); // all
router.get('/:id', walletController.getWallet);
export default router;
