import Router from "express";
import userRoutes from "./userRoutes.js";
import walletRoutes from "./walletRoutes.js";
import revenueRoutes from "./revenueRoutes.js";
import expenseRoutes from "./expenseRoutes.js";
import listWalletsWalletRoutes from "./listWalletsRoutes.js";

const router = Router();

router.use('/user', userRoutes);
router.use('/wallet', walletRoutes);
router.use('/listWallets', listWalletsWalletRoutes);
router.use('/revenue', revenueRoutes);
router.use('/expense', expenseRoutes);

export default router