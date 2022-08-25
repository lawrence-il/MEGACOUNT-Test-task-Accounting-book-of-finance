import UserStore from "./UserStore";
import WalletStore from "./WalletStore";

export const state = {
    user: new UserStore(),
    wallet: new WalletStore()
};