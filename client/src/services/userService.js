import { get, post, put, del } from './api';

export const fetchUser = async () => {
    return await get('/auth');
};

export const userRegister = async (data) => {
    return await post('/auth',data);
};

export const userLogin = async (data) => {
    return await post('/auth/login',data);
};

export const userSendResetLink = async (email) => {
    return await post('auth/reset-password',{email:email})
}

export const userResetPassWord = async (token,data) => {
    return await post (`auth/reset-password/${token}`,{newPassword:data})
}

