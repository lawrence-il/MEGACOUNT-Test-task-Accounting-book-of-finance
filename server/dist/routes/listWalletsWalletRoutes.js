import Router from "express";
import listWalletsWalletController from "../controllers/listWalletsWalletController.js";
const router = Router();
router.get('/', listWalletsWalletController.getListWallet);
export default router;
