import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl } from '../../constants/AppConstants';
import { create_todo_url, update_todo_url, delete_todo_url, get_todo } from '../../constants/ServiceUrl';
import { APISuccess } from '../../models/responseType/api.Success';
import apiHeader from '../../utils/api-header';
import { Todo } from '../../models/responseType/UserListResponse';
import { UserToDoResponse } from '../../models/responseType/userToDoResponse';
// import { authSlice } from '../../redux/authStore/authReducers';
import { useDispatch } from 'react-redux';


const createToDo = async ({ formData }: { formData: any }) => {
    const authHeader = await apiHeader();
    return await axios.post<APISuccess>(`${getBaseUrl()}${create_todo_url}`, formData, {
        headers: {
            ...authHeader.headers,
            'Content-Type': 'multipart/form-data',
        },
    });
};

const updateToDo = async ({ postData }: { postData: Todo }) => {
    return await axios.post<APISuccess>(`${getBaseUrl()}${update_todo_url}`, { ...postData }, await apiHeader());
};

const deleteToDo = async ({ postData }: { postData: Todo }) => {
    return await axios.delete<APISuccess>(`${getBaseUrl()}${delete_todo_url}/${postData?.toDoId}`, await apiHeader());
};

const getToDoInfo = async ({ postData }: { postData: Todo }) => {
    return await axios.get<UserToDoResponse>(`${getBaseUrl()}${get_todo}/${postData?.toDoId}`, await apiHeader());
};

const useCreateToDMutation = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: createToDo,
        mutationKey: [create_todo_url],
        //@ts-ignore
        throwOnError: (error) => {
            //@ts-ignore
            if (error.response?.status === 401) {
                console.log('1 unauthorized');
                // dispatch( authSlice.actions.userLoginLogOutAction());
            }
        },
    });
};

const useUpdatedateToDoMutation = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: updateToDo,
        mutationKey: [update_todo_url],
        //@ts-ignore
        throwOnError: (error) => {
            //@ts-ignore
            if (error.response?.status === 401) {
                console.log('2 unauthorized');
                // dispatch(authSlice.actions.userLoginLogOutAction()); 
            }
        },
    });
};

const useUeleteToDoMutation = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: deleteToDo,
        mutationKey: [delete_todo_url],
        //@ts-ignore
        throwOnError: (error) => {
            //@ts-ignore
            if (error.response?.status === 401) {
                console.log('3 unauthorized');
                // dispatch(authSlice.actions.userLoginLogOutAction());
            }
        },
    });
};

const useGetToDoInFo = (postData: Todo) => {
    const dispatch = useDispatch();
    return useQuery({
        enabled: false,
        queryKey: [get_todo],
        queryFn: () => getToDoInfo({ postData: postData }),
        //@ts-ignore
        throwOnError: (error) => {
            //@ts-ignore
            if (error.response?.status === 401) {
                console.log('unauthorized');
                // dispatch(authSlice.actions.userLoginLogOutAction());
            }
        },
    });
};


export { useCreateToDMutation, useUpdatedateToDoMutation, useUeleteToDoMutation, useGetToDoInFo };
