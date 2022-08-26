import { makeAutoObservable } from "mobx";
import { RecordType } from "../types/types";

class ExpenseStore {
    expenses: RecordType[]

    constructor() {
        this.expenses = [
            {
                key: 1,
                name: "Расход 1000",
                value: 48484
            }
        ]
        makeAutoObservable(this);
    }

    setExpenses = (expenses: RecordType[]) => {
        this.expenses = expenses;
    }

    get getExpenses() {
        return this.expenses
    }
}

export default ExpenseStore;