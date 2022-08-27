import { $authHost } from './';

import { User } from '../types/types';


const fetchListWallet = async (user: User) => {
    const { data } = await $authHost.get('api/listWallets/', {data: user});
    return data;
};

export {fetchListWallet};