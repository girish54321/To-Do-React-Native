import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl } from '../../constants/AppConstants';
import { get_todo } from '../../constants/ServiceUrl';
import { store } from '../../redux/rootReducer';
import { UserToDoResponse } from '../../models/responseType/userToDoResponse';
import { authSlice } from '../../redux/authStore/authReducers';
import apiHeader from '../../utils/api-header';


const getUserToDo = async () => {
    return await axios.get<UserToDoResponse>(`${getBaseUrl()}${get_todo}`, {
        ...apiHeader,
    });
};

const useToDoQuery = () => {
    return useQuery({
        queryFn: getUserToDo,
        queryKey: [get_todo],
        //@ts-ignore
        throwOnError: (error) => {
            //@ts-ignore
            if (error.response?.status === 401) {
                console.log('unauthorized');
                store.dispatch(authSlice.actions.userLoginLogOutAction());
            }
        },
    });
};

export { useToDoQuery };
