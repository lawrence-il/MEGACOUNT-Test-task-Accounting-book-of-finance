import Router from "express";
import userRoutes from "./userRoutes.js";
import walletRoutes from "./walletRoutes.js";
import revenueRoutes from "./revenueRoutes.js";
import expenseRoutes from "./expenseRoutes.js";
import listWalletsWalletRoutes from "./listWalletsWalletRoutes.js";

const router = Router();

router.use('/user', userRoutes);
router.use('/wallet', walletRoutes);
router.use('/listWalletsWallet', listWalletsWalletRoutes);
router.use('/revenue', revenueRoutes);
router.use('/expence', expenseRoutes);

export default router