import { makeAutoObservable } from 'mobx';

class WalletStore {
    wallet: object;

    constructor() {
        this.wallet = {};
        makeAutoObservable(this);
    }

    setWallet = (wallet: object) => {
        this.wallet = wallet;
    }

    get getWallet() {
        return this.wallet;
    }
}

export default WalletStore;