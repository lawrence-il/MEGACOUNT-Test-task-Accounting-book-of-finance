import { $authHost } from './';

const addExpense = async (name: string, value: number, WalletId: number) => {
    const { data } = await $authHost.post('api/expense/', {name, value, WalletId});
    return data;
};

const fetchAllExpense = async (WalletId: number, sort='DESC') => {
    const { data } = await $authHost.get(`api/expense?WalletId=${WalletId}&sort=${sort}`);
    return data;
};

const updateExpense = async (name: string, value: number, id: number) => {
    const { data } = await $authHost.put('api/expense/', {name, value, id});
    return data;
};

const deleteExpense = async (id: number) => {
    const { data } = await $authHost.delete(`api/expense/${id}`);
    return data;
};

export {addExpense, fetchAllExpense, deleteExpense, updateExpense};