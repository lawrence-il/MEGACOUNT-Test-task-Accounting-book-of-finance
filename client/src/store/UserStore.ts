import { makeAutoObservable } from 'mobx';
import { User } from '../types/types';

class UserStore {
    auth: boolean;
    user: User;

    constructor() {
        this.auth = true;
        this.user = {id: 0, role: '', exp: 0, iat: 0};
        makeAutoObservable(this);
    }

    setAuth = (auth: boolean) => {
        this.auth = auth;
    };

    setUser = (user: User) => {
        this.user = user;
    };

    get getAuth() {
        return this.auth;
    } 

    get getUser() {
        return this.user;
    }
}

export default UserStore;