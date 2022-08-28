import { $authHost } from './';

const addRevenue = async (name: string, value: number, WalletId: number) => {
    const { data } = await $authHost.post('api/revenue/', {name, value, WalletId});
    return data;
};

const fetchAllRevenue = async (WalletId: number, sort='DESC') => {
    const { data } = await $authHost.get(`api/revenue?WalletId=${WalletId}&sort=${sort}`);
    return data;
};

const updateRevenue = async (name: string, value: number, id: number) => {
    const { data } = await $authHost.put('api/revenue/', {name, value, id});
    return data;
};

const deleteRevenue = async (id: number) => {
    const { data } = await $authHost.delete(`api/revenue/${id}`);
    return data;
};

export {addRevenue, fetchAllRevenue, deleteRevenue, updateRevenue};