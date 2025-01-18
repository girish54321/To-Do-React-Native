import { useState } from 'react';
import {
    NativeModules,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { useSignUp, useUserLogin } from '../../Network/Querys/useLoginMutaion';
import { authSlice } from '../../redux/authStore/authReducers';
import { ErrorRes } from '../../models/responseType/LoginRes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONST } from '../../Config/Colors';

export const defaultLoginScreenState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    secureTextEntry: true,
    isValidEmail: false,
    isValidPassword: false,
};

const useLoginScreenModal = () => {
    const paperTheme = useTheme();
    const [userData, setuserData] = useState(defaultLoginScreenState);
    const [isSignUp, setIsSignUp] = useState(false);

    const nativeData = NativeModules.RNConfigModule;

    const authDispatch = useDispatch();
    const { mutate, isPending: isLoading } = useUserLogin();
    const { mutate: createAccountFun, isPending: createAccountLoading } = useSignUp();

    const saveUserLogin = async () => {
        const action = isSignUp ? createAccountFun : mutate;
        action({ postData: userData }, {
            onSuccess: async (data) => {
                await AsyncStorage.setItem(APP_CONST.TOKENS, data.data.accessToken ?? '');
                const payload = {
                    isLoading: false,
                    userLoggedIn: true,
                    loginRes: data.data,
                };
                const jsonValue = JSON.stringify(payload);
                AsyncStorage.setItem(APP_CONST.USER_LOGIN, jsonValue);
                authDispatch(authSlice.actions.userLoginAction(payload));
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

    const onFirstNameChange = (val: string) => {
        setuserData({
            ...userData,
            firstName: val,
        });
    };

    const onLastNmaeChange = (val: string) => {
        setuserData({
            ...userData,
            lastName: val,
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

    const createAccount = () => {
        setIsSignUp(!isSignUp);
    };

    return {
        paperTheme,
        userData,
        saveUserLogin,
        textEmailChange,
        textPasswordChange,
        nativeData,
        createAccount,
        isSignUp,
        isLoading: isLoading ?? createAccountLoading,
        onFirstNameChange,
        onLastNmaeChange,
    };

};

export default useLoginScreenModal;
