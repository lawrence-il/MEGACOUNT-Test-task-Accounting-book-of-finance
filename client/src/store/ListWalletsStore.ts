import { makeAutoObservable } from 'mobx';
import { RecordType } from '../types/types';

class ListWalletsStore {
    wallets: RecordType[];
    
    constructor() {
        this.wallets = [
            {
                key: 1,
                name: 'Кошелёк 1',
                value: 3200,
            },
            {
                key: 2,
                name: 'Кошелёк 2',
                value: 4200,
            },
            {
                key: 3,
                name: 'Кошелёк 3',
                value: 2900,
            },
            {
                key: 4,
                name: 'Кошелёк 4',
                value: 3200,
            },
        ];
        makeAutoObservable(this);
    }

    setWallets = (wallets: RecordType[]) => {
        this.wallets = wallets;
    }

    get getWallets() {
        return this.wallets;
    }
}

export default ListWalletsStore;