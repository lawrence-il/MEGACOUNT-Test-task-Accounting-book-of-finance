import { makeAutoObservable } from "mobx";
import { RecordType } from "../types/types";

class RevenueStore {
    revenues: RecordType[]

    constructor() {
        this.revenues = [
            {
                key: 1,
                name: "Доход 1",
                value: 56565
            }
        ]
        makeAutoObservable(this);
    }

    setRevenues= (revenues: RecordType[]) => {
        this.revenues = revenues;
    }

    get getRevenues() {
        return this.revenues
    }
}

export default RevenueStore;