import { makeAutoObservable } from "mobx";
import { RecordType } from "../types/types";

class BalancesStore {
    balances: RecordType[]

    constructor() {
        this.balances = [
            {
                key: 1,
                name: "Расход 1",
                value: 56565
            }
        ]
        makeAutoObservable(this);
    }

    setBalances = (balances: RecordType[]) => {
        this.balances = balances;
    }

    get getBalances() {
        return this.balances
    }
}

export default BalancesStore;