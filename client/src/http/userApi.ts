import { $authHost, $host } from "./";
import jwt_decode from "jwt-decode";
import { User } from "../types/types";


const registrationUser = async (login: string, password: string) => {
    const {data} = await $host.post('api/user/registration', {login, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token) as User;
};


const loginUser = async (login: string, password: string) => {
    const {data} = await $host.post('api/user/login', {login, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token) as User;
};


const authCheck = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token) as User;
};

export {registrationUser, loginUser, authCheck};