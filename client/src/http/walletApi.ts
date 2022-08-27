import { $authHost } from './';
import { User } from '../types/types';

const createWallet = async (name: string, value: number, user: User) => {
    const { data } = await $authHost.post('api/wallets', {name, value, user});
    return data;
};

const fetchAllWallets = async () => { // возможно заменю на то что есть в лист валет апи
    const { data } = await $authHost.get('api/wallets/');
    return data;
};

// const fetchWallet = async (id) => {
//     const { data } = await $authHost.get('api/wallet/');
//     return data;
// };

// const updateWallet = async (login: string, password: string) => {
//     const { data } = await $host.put('api/');
//     localStorage.setItem('token', data.token);
//     return jwt_decode(data.token) as User;
// };

const deleteWallet = async (id: number) => {
    const { data } = await $authHost.delete(`api/wallets/${id}`);
    return data;
};

export { createWallet, fetchAllWallets, deleteWallet };
