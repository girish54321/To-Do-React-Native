import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl } from '../../constants/AppConstants';
import { getAllToDos } from '../../constants/ServiceUrl';
import { UserToDOS } from '../../models/responseType/UserListResponse';
import apiHeader from '../../utils/api-header';
import { useDispatch } from 'react-redux';

const fetchToDos = async ({ pageParam }: { pageParam: number }) => {
    return await axios.get<UserToDOS>(`${getBaseUrl()}${getAllToDos}?page=${pageParam}?size=5`, await apiHeader());
};

const useToDoList = () => {
    const dispatch = useDispatch();
    return useInfiniteQuery({
        queryKey: [getAllToDos],
        queryFn: fetchToDos,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length < (lastPage.data.total_pages ?? 0)) {
                return allPages.length + 1;
            } else {
                return undefined;
            }
        },
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

export { useToDoList };
