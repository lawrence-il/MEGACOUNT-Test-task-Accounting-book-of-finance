import { makeAutoObservable } from 'mobx';
import { RecordType } from '../types/types';

class ListWalletsStore {
    wallets: RecordType[];
    isChangeWallet: boolean;
    constructor() {
        this.wallets = [];
        this.isChangeWallet = false;
        makeAutoObservable(this);
    }

    setWallets = (wallets: RecordType[]) => {
        this.wallets = wallets;
    };

    setIsChangeWallet = (isChangeWallet: boolean) => {
        this.isChangeWallet = isChangeWallet;
    };

    get getWallets() {
        return this.wallets;
    }
}

export default ListWalletsStore;
