import { makeAutoObservable } from "mobx";
import { RecordType } from "../types/types";

class RevenueStore {
    revenues: RecordType[];
    isChangeRevenue: boolean;
    constructor() {
        this.revenues = [];
        this.isChangeRevenue = false;
        makeAutoObservable(this);
    }

    setIsChangeRevenue = (isChangeRevenue: boolean) => {
        this.isChangeRevenue = isChangeRevenue;
    };

    setRevenues= (revenues: RecordType[]) => {
        this.revenues = revenues;
    };

    get getRevenues() {
        return this.revenues;
    }
}

export default RevenueStore;