import { $authHost } from './';
import { User } from '../types/types';

const createWallet = async (name: string, value: number, user: User) => {
    const { data } = await $authHost.post('api/wallets', { name, value, user });
    return data;
};

const fetchAllWallets = async () => {
    const { data } = await $authHost.get('api/wallets/');
    return data;
};

const fetchWallet = async (id: number) => {
    const { data } = await $authHost.get(`api/wallets/${id}`);
    return data;
};

const updateWallet = async (name: string, value: number, id: number) => {
    const { data } = await $authHost.put('api/wallets/', {name, value, id});
    return data;
};

const deleteWallet = async (id: number) => {
    const { data } = await $authHost.delete(`api/wallets/${id}`);
    return data;
};

export {createWallet, fetchAllWallets, 
        deleteWallet, fetchWallet, updateWallet};
