import UserStore from "./UserStore";
import ListWalletsStore from "./ListWalletsStore";

export const state = {
    user: new UserStore(),
    listWallets: new ListWalletsStore()
};