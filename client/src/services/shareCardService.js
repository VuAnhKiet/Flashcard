import { get, post, put, del } from './api';

export const fetchShareCards = async () => {
    return await get('/share');
};

export const addToShare = async (card) => {
    return await post('/share/add', card);
};

export const deleteShareCard = async (cardId) => {
    return await del(`/share/remove-from-section/${cardId}`);
};

export const getFriendsShareSetCard = async (id) => {
    return await get(`/share/friend-setcard/${id}`)
}

export const getFriendsShareCard = async (id) => {
    return await get(`/share/friend-card/${id}`)
}
