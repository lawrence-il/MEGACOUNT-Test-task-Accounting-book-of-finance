import UserStore from "./UserStore";
import ListWalletsStore from "./ListWalletsStore";
import RevenueStore from "./RevenuesStore";
import ExpenseStore from "./ExpenseStore";

export const state = {
    user: new UserStore(),
    listWallets: new ListWalletsStore(),
    revenues: new RevenueStore(),
    expenses: new ExpenseStore(),
};