import { store } from '../redux/rootReducer';

const token = store?.getState()?.authReducer?.loginRes?.accessToken;
const apiHeader = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
    },
};


export default apiHeader;
