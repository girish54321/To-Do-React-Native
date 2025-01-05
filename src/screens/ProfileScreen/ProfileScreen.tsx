import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { AppView } from '../../components/Flex/Flex';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppSelector } from '../../hooks/redux-hooks';
import { AUTH_TYPE } from '../../redux/authStore/authReducers';
import { useProfileQuery, useUpdateProfileMutation } from '../../Network/Querys/useLoginMutaion';
import { serverUrl } from '../../constants/AppConstants';
import { goBack } from '../../navigation/NavigationService';
import ImagePicker from 'react-native-image-crop-picker';
import { DocumentPickerResponse, pickSingle, types } from 'react-native-document-picker';
import pickSingleImage from '../../utils/filePicker';

const ProfileScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const authState: AUTH_TYPE = useAppSelector((state: any) => state.authReducer);
    const { data, isLoading, refetch } = useProfileQuery();
    const { mutate } = useUpdateProfileMutation();
    const [fileUri, setFileUri] = useState<DocumentPickerResponse | null>(null);

    const [profile, setProfile] = useState(isLoading ? {
        ...authState.loginRes?.user,
    } : {
        ...data.data.users,
    });

    useEffect(() => {
        navigation.setOptions({ title: 'Profile' });
    },);

    const updateProfile = async () => {
        const formData = new FormData();
        formData.append('firstName', profile.firstName);
        formData.append('lastName', profile?.lastName);
        if (fileUri) {
            formData.append('file', fileUri);
        }
        mutate({
            formData,
        }, {
            onSuccess: () => {
                refetch();
                goBack();
            },
            onError: (error) => {
                //@ts-ignore
                let errorData = error.response?.data as ErrorRes;
                Alert.alert('Error', errorData?.error.message);
            },
        });
    };

    const pickImage = async () => {
        const file = await pickSingleImage();
        setFileUri(file);
    };

    const onChangeFirstName = (text: string) => {
        setProfile({ ...profile, firstName: text });
    };

    const onChangeLastName = (text: string) => {
        setProfile({ ...profile, lastName: text });
    };

    return (
        <AppView>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.rootView}>
                <View style={styles.row}>
                    <View />
                    {fileUri && <TouchableOpacity onPress={pickImage}>
                        <Avatar.Image size={124} source={{ uri: fileUri.uri }} />
                    </TouchableOpacity>}
                    {!fileUri && profile?.files?.map((imageItem) => {
                        return (
                            <Avatar.Image onTouchEnd={pickImage} size={124} source={{ uri: `${serverUrl()}/${imageItem.fileName}` }} resizeMode="stretch" />
                        );
                    })}
                    <View />
                </View>
                <TextInput
                    style={styles.inputStyle}
                    value={profile.firstName}
                    label="First Name"
                    autoCapitalize="none"
                    onChangeText={onChangeFirstName}
                    mode="outlined"
                    placeholder="First Name"
                />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={onChangeLastName}
                    label="Last Name"
                    value={profile.lastName}
                    autoCapitalize="none"
                    mode="outlined"
                    placeholder="Last Name"
                />
            </KeyboardAwareScrollView>
            <Button
                style={styles.buttonStyle}
                onPress={updateProfile}
                mode="contained"
            >Update Profile
            </Button>
        </AppView >
    );
};

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        padding: 12,
    },
    buttonStyle: {
        margin: 12,
    },
    inputStyle: {
        marginTop: 12,
    },
    row: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flex1: {
        flex: 1,
    },
});

export default ProfileScreen;

