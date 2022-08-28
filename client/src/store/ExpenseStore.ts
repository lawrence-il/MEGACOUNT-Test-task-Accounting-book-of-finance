import { makeAutoObservable } from "mobx";
import { RecordType } from "../types/types";

class ExpenseStore {
    expenses: RecordType[];
    isChangeExpenses: boolean;
    constructor() {
        this.expenses = [];
        this.isChangeExpenses = false;
        makeAutoObservable(this);
    }

    setIsChangeExpenses = (isChangeExpenses: boolean) => {
        this.isChangeExpenses = isChangeExpenses;
    };

    setExpenses = (expenses: RecordType[]) => {
        this.expenses = expenses;
    };

    get getExpenses() {
        return this.expenses;
    }
}

export default ExpenseStore;