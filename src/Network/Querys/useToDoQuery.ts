import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl } from '../../constants/AppConstants';
import { get_todo } from '../../constants/ServiceUrl';
import { UserToDoResponse } from '../../models/responseType/userToDoResponse';
import { authSlice } from '../../redux/authStore/authReducers';
import apiHeader from '../../utils/api-header';
import { useDispatch } from 'react-redux';


const getUserToDo = async () => {
    return await axios.get<UserToDoResponse>(`${getBaseUrl()}${get_todo}`, await apiHeader());
};

const useToDoQuery = () => {
    const dispatch = useDispatch();
    return useQuery({
        queryFn: getUserToDo,
        queryKey: [get_todo],
        //@ts-ignore
        throwOnError: (error) => {
            //@ts-ignore
            if (error.response?.status === 401) {
                console.log('unauthorized');
                dispatch(authSlice.actions.userLoginLogOutAction());
            }
        },
    });
};

export { useToDoQuery };
