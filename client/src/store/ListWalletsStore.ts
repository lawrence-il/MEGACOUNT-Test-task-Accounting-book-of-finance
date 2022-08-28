import { makeAutoObservable } from 'mobx';
import { RecordType } from '../types/types';

class ListWalletsStore {
    wallets: RecordType[];
    WalletId: number
    isChangeWallet: boolean;
    constructor() {
        this.wallets = [];
        this.isChangeWallet = false;
        this.WalletId = 0;
        makeAutoObservable(this);
    }

    setWallets = (wallets: RecordType[]) => {
        this.wallets = wallets;
    };

    setIsChangeWallet = (isChangeWallet: boolean) => {
        this.isChangeWallet = isChangeWallet;
    };

    setWalletId = (WalletId: number) => {
        this.WalletId = WalletId;
    };

    get getWallets() {
        return this.wallets;
    }
}

export default ListWalletsStore;
