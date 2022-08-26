import UserStore from "./UserStore";
import ListWalletsStore from "./ListWalletsStore";
import BalancesStore from "./BalancesStore";

export const state = {
    user: new UserStore(),
    listWallets: new ListWalletsStore(),
    balances: new BalancesStore()
};