import { makeAutoObservable } from 'mobx';

class UserStore {
    auth: boolean;
    user: object;

    constructor() {
        this.auth = true;
        this.user = {};
        makeAutoObservable(this);
    }

    setAuth = (auth: boolean) => {
        this.auth = auth;
    };

    setUser = (user: object) => {
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