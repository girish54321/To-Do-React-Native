import { useState } from 'react';
import {
    NativeModules,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { useUserLogin } from '../../Network/Querys/useLoginMutaion';
import { authSlice } from '../../redux/authStore/authReducers';
import { ErrorRes } from '../../models/responseType/LoginRes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONST } from '../../Config/Colors';

export const defaultLoginScreenState = {
    email: '',
    password: '',
    secureTextEntry: true,
    isValidEmail: false,
    isValidPassword: false,
};

const useLoginScreenModal = () => {
    const paperTheme = useTheme();
    const [userData, setuserData] = useState(defaultLoginScreenState);

    const nativeData = NativeModules.RNConfigModule;

    const authDispatch = useDispatch();
    const { mutate, isPending: isLoading } = useUserLogin();

    const saveUserLogin = async () => {
        let postData = {
            email: 'girish12wwwwssww@gmail.com',
            password: '123456',
        };
        mutate({ postData: postData }, {
            onSuccess: async (data) => {
                await AsyncStorage.setItem(APP_CONST.TOKENS, data.data.accessToken ?? '');
                authDispatch(authSlice.actions.userLoginAction({
                    isLoading: false,
                    userLoggedIn: true,
                    loginRes: data.data,
                }));
            },
            onError: (error) => {
                //@ts-ignore
                let errorData = error.response?.data as ErrorRes;
                Alert.alert('Error', errorData?.error.message);
            },
        });
    };

    const textEmailChange = (val: any) => {
        setuserData({
            ...userData,
            email: val.trim(),
            isValidEmail: true,
        });
    };

    const textPasswordChange = (val: any) => {
        if (val.trim().length >= 8) {
            setuserData({
                ...userData,
                password: val,
                isValidPassword: true,
            });
        } else {
            setuserData({
                ...userData,
                password: val,
                isValidPassword: false,
            });
        }
    };

    return {
        paperTheme,
        userData,
        saveUserLogin,
        textEmailChange,
        textPasswordChange,
        nativeData,
        isLoading,
    };

};

export default useLoginScreenModal;
