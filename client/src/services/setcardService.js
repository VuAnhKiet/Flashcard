import { get, post, put, del } from './api';

export const fetchSetCards = async () => {
    return await get('/setcard');
};

export const createSetCard = async (flashcard) => {
    return await post('/setcard', flashcard);
};

export const updateSetCard = async ({name,id}) => {
    return await put(`/setcard`, {name:name,id:id});
};

export const deleteSetCard = async (id) => {
    return await del(`/setcard/${id}`);
};

export const searchSetCard = async (s) => {
    return await get('/setcard/search', { params: {s} }); 
};
