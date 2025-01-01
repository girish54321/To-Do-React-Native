import { useState } from 'react';
import {
    Alert,
} from 'react-native';
import { ErrorRes } from '../../models/responseType/LoginRes';
import { useCreateToDMutation, useUpdatedateToDoMutation } from '../../Network/Querys/useToDMutation';
import { goBack } from '../../navigation/NavigationService';
import { Todo } from '../../models/responseType/UserListResponse';
import { DocumentPickerResponse, pickSingle, types } from 'react-native-document-picker'

export const defaultToDoState = {
    title: '',
    body: '',
    state: 'pending',
};

const useCreateToDo = (updateToDO?: Todo) => {
    const [fileUri, setFileUri] = useState<DocumentPickerResponse>(null);
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


    const pickSingleImage = async () => {
        try {
            const file = await pickSingle({
                type: [types.images],
            });
            setFileUri(file);
        } catch (error) {
            console.log('pickSingleImage Error', error);
        }

    };

    const createToDo = async () => {
        const formData = new FormData();
        formData.append('title', todoData?.title,);
        formData.append('body', todoData?.body,);
        formData.append('state', todoData?.state);
        if (fileUri) {
            formData.append('file', fileUri);
        }
        mutate({
            formData,
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

    const updateToDoStatus = (status: string) => {
        setToDoData({
            ...todoData,
            state: status,
        });
    };

    return {
        todoData,
        onTitleChange,
        onBodyChange,
        createToDo,
        loading: isLoading || updateLoading,
        updateToDoStatus,
        updateToDo,
        fileUri,
        pickSingleImage,
    };

};

export default useCreateToDo;
