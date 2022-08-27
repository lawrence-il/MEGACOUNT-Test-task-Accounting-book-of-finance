import { makeAutoObservable } from 'mobx';
import { RecordType } from '../types/types';

class ListWalletsStore {
    wallets: RecordType[];
    isChange: boolean;
    constructor() {
        this.wallets = [];
        this.isChange = false;
        makeAutoObservable(this);
    }

    setWallets = (wallets: RecordType[]) => {
        this.wallets = wallets;
    };

    setIsChange = (isChange: boolean) => {
        this.isChange = isChange;
    };

    get getWallets() {
        return this.wallets;
    }
}

export default ListWalletsStore;
