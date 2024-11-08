import { get, post, put, del } from './api';

export const fetchFriends = async (id) => {
    return await get(`/auth/friends`);
};

export const sendRequest = async (id) => {
    return await post('/auth/friend-request',{receiverId:id});
};

export const getPendingRequest = async () => {
    return await get(`/auth/friend-requests`);
};

export const acceptFriend = async (id) => {
    return await put(`/auth/friend-requests/${id}/accept`);
};

export const rejectFriend = async (id) => {
    return await put(`/auth/friend-requests/${id}/reject`); 
};

export const searchFriends = async (s) => {
    return await get('/auth/search-friends',{params:{s}});
}

export const unFriend = async (id) => {
    return await del(`/auth/unfriend/${id}`)
}