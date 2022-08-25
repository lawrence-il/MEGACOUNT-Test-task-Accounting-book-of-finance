import { makeAutoObservable } from 'mobx';
import { Wallet } from '../types/types';

class ListWalletsStore {
    wallets: Wallet[];
    
    constructor() {
        this.wallets = [
            {
                key: 1,
                nameWallet: 'Кошелёк 1',
                currentBalance: 3200,
            },
            {
                key: 2,
                nameWallet: 'Кошелёк 2',
                currentBalance: 4200,
            },
            {
                key: 3,
                nameWallet: 'Кошелёк 3',
                currentBalance: 2900,
            },
            {
                key: 4,
                nameWallet: 'Кошелёк 4',
                currentBalance: 3200,
            },
        ];
        makeAutoObservable(this);
    }

    setWallets = (wallets: Wallet[]) => {
        this.wallets = wallets;
    }

    get getWallets() {
        return this.wallets;
    }
}

export default ListWalletsStore;