import { useState } from 'react';
import {
    Alert,
} from 'react-native';
import { ErrorRes } from '../../models/responseType/LoginRes';
import { useCreateToDMutation, useUpdatedateToDoMutation } from '../../Network/Querys/useToDMutation';
import { goBack } from '../../navigation/NavigationService';
import { Todo } from '../../models/responseType/UserListResponse';

export const defaultToDoState = {
    title: '',
    body: '',
    state: 'pending',
};

const useCreateToDo = (updateToDO?: Todo) => {
    const [todoData, setToDoData] = useState(updateToDO ?? defaultToDoState);
    const { mutate, isPending: isLoading } = useCreateToDMutation();
    const { mutate: updateMutate, isPending: updateLoading } = useUpdatedateToDoMutation();

    const updateToDo = () => {
        updateMutate({
            postData: {
                ...todoData,
            },
        }, {
            onSuccess: () => {
                goBack();
            },
            onError: (error) => {
                //@ts-ignore
                let errorData = error.response?.data as ErrorRes;
                Alert.alert('Error', errorData?.error.message);
            },
        });
    };

    const createToDo = async () => {
        mutate({
            postData: {
                ...todoData,
            },
        }, {
            onSuccess: () => {
                goBack();
            },
            onError: (error) => {
                //@ts-ignore
                let errorData = error.response?.data as ErrorRes;
                Alert.alert('Error', errorData?.error.message);
            },
        });
    };

    const onTitleChange = (text: string) => {
        setToDoData({
            ...todoData,
            title: text,
        });
    };

    const onBodyChange = (text: string) => {
        setToDoData({
            ...todoData,
            body: text,
        });
    };

    return {
        todoData,
        onTitleChange,
        onBodyChange,
        createToDo,
        loading: isLoading || updateLoading,
        updateToDo,
    };

};

export default useCreateToDo;
