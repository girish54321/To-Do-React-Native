import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl } from '../../constants/AppConstants';
import { getAllToDos } from '../../constants/ServiceUrl';
import { UserToDOS } from '../../models/responseType/UserListResponse';
import apiHeader from '../../utils/api-header';

const fetchToDos = async ({ pageParam }: { pageParam: number }) => {
    return await axios.get<UserToDOS>(`${getBaseUrl()}${getAllToDos}?page=${pageParam}`, apiHeader);
};

const useToDoList = () => {
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
    });
};

export { useToDoList };
