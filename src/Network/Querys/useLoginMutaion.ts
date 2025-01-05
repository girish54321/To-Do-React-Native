import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBaseUrl } from '../../constants/AppConstants';
import { getUserProfileUrl, loginUrl, registerUrl, updateProfileUrl } from '../../constants/ServiceUrl';
import { LoginRes, UserProfileResponse } from '../../models/responseType/LoginRes';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../redux/authStore/authReducers';
import apiHeader from '../../utils/api-header';
import { APISuccess } from '../../models/responseType/api.Success';


const fetchUser = async ({ postData }: { postData: any }) => {
    return await axios.post<LoginRes>(`${getBaseUrl()}${loginUrl}`, { ...postData });
};

const signUpUser = async ({ postData }: { postData: any }) => {
    return await axios.post<LoginRes>(`${getBaseUrl()}${registerUrl}`, { ...postData });
};

const getUserData = async () => {
    return await axios.get<UserProfileResponse>(`${getBaseUrl()}${getUserProfileUrl}`, await apiHeader());
};

const updateProfile = async ({ formData }: { formData: any }) => {
    const authHeader = await apiHeader();
    return await axios.post<APISuccess>(`${getBaseUrl()}${updateProfileUrl}`, formData, {
        headers: {
            ...authHeader.headers,
            'Content-Type': 'multipart/form-data',
        },
    });
};

const useSignUp = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: signUpUser,
        mutationKey: [registerUrl],
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


const useProfileQuery = () => {
    const dispatch = useDispatch();
    return useQuery({
        queryFn: getUserData,
        // refetchOnMount: true,
        queryKey: [getUserProfileUrl],
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

const useUpdateProfileMutation = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: updateProfile,
        mutationKey: [updateProfileUrl],
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


export { useUserLogin, useSignUp, useProfileQuery, useUpdateProfileMutation };
