import { useEffect, useState } from 'react';
import { Todo } from '../../models/responseType/UserListResponse';
import { Route } from '../../constants/Route';
import { navigate } from '../../navigation/NavigationService';
import { useRoute } from '@react-navigation/native';
import { useGetToDoInFo, useUeleteToDoMutation, useUpdatedateToDoMutation } from '../../Network/Querys/useToDMutation';
import { Alert } from 'react-native';

const useSelectedScreen = () => {
    const [visible, setVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const route = useRoute();
    const data: Todo = route?.params?.data;
    const { mutate: deleteToDo, isPending: isLoading } = useUeleteToDoMutation();
    const { data: toDoInfo, isLoading: todoInfoLoading, error: getTodoErrpr, refetch } = useGetToDoInFo(data);
    const { mutate: updateMutate, isPending: updateLoading } = useUpdatedateToDoMutation();

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data]);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const openDeleteModal = () => {
        closeMenu();
        setDeleteModal(true);
    };

    const closeDeleteModal = () => setDeleteModal(false);

    const deleteToDoAction = () => {
        closeDeleteModal();
        deleteToDo({ postData: data }, {
            onSuccess: () => {
                Alert.alert('Success', 'Todo deleted successfully');
                refetch();
            },
            onError: (error) => {
                //@ts-ignore
                let errorData = error.response?.data as ErrorRes;
                Alert.alert('Error', errorData?.error.message);
            },
        });
    };

    const updateToDoStates = (val: string) => {
        let postData = {
            ...data,
            state: val,
        };
        if (!updateLoading) {
            updateMutate({ postData }, {
                onSuccess: () => {
                    Alert.alert('Success', 'Todo state updated successfully');
                    refetch();
                },
                onError: (error) => {
                    //@ts-ignore
                    let errorData = error.response?.data as ErrorRes;
                    Alert.alert('Error', errorData?.error.message);
                },
            });
        }
    };

    const updateToDoScreen = () => {
        navigate(Route.CREATE_TODO, { data: data });
        closeMenu();
    };

    return {
        visible,
        openMenu,
        closeMenu,
        updateToDoScreen,
        deleteToDoAction,
        data: toDoInfo?.data?.todo,
        isLoading: isLoading || todoInfoLoading,
        openDeleteModal,
        closeDeleteModal,
        refetch,
        error: getTodoErrpr,
        updateToDoStates,
        deleteModal,
    };
};

export default useSelectedScreen;
