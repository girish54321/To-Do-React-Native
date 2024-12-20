import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl } from '../../constants/AppConstants';
import { loginUrl } from '../../constants/ServiceUrl';
import { LoginRes } from '../../models/responseType/LoginRes';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../redux/authStore/authReducers';


const fetchUser = async ({ postData }: { postData: any }) => {
    return await axios.post<LoginRes>(`${getBaseUrl()}${loginUrl}`, { ...postData });
};

const useUserLogin = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: fetchUser,
        mutationKey: [loginUrl],
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

export { useUserLogin };
