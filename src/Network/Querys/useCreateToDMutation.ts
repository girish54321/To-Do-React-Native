import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl } from '../../constants/AppConstants';
import { create_todo_url, update_todo_url, delete_todo_url, get_todo } from '../../constants/ServiceUrl';
import { APISuccess } from '../../models/responseType/api.Success';
import apiHeader from '../../utils/api-header';
import { Todo } from '../../models/responseType/UserListResponse';
import { UserToDoResponse } from '../../models/responseType/userToDoResponse';


const createToDo = async ({ postData }: { postData: any }) => {
    return await axios.post<APISuccess>(`${getBaseUrl()}${create_todo_url}`, { ...postData }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: apiHeader.headers.Authorization,
        },
    });
};

const updateToDo = async ({ postData }: { postData: Todo }) => {
    return await axios.post<APISuccess>(`${getBaseUrl()}${update_todo_url}`, { ...postData }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: apiHeader.headers.Authorization,
        },
    });
};

const deleteToDo = async ({ postData }: { postData: Todo }) => {
    return await axios.delete<APISuccess>(`${getBaseUrl()}${delete_todo_url}/${postData?.toDoId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: apiHeader.headers.Authorization,
        },
    });
};

const getToDoInfo = async ({ postData }: { postData: Todo }) => {
    return await axios.get<UserToDoResponse>(`${getBaseUrl()}${get_todo}/${postData?.toDoId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: apiHeader.headers.Authorization,
        },
    });
};

const useCreateToDMutation = () => {
    return useMutation({
        mutationFn: createToDo,
        mutationKey: [create_todo_url],
    });
};

const useUpdatedateToDoMutation = () => {
    return useMutation({
        mutationFn: updateToDo,
        mutationKey: [update_todo_url],
    });
};

const useUeleteToDoMutation = () => {
    return useMutation({
        mutationFn: deleteToDo,
        mutationKey: [delete_todo_url],
    });
};

const useGetToDoInFo = (postData: Todo) => {
    return useQuery({
        queryKey: [get_todo],
        queryFn: () => getToDoInfo({ postData: postData }),
    });
};


export { useCreateToDMutation, useUpdatedateToDoMutation, useUeleteToDoMutation, useGetToDoInFo };
