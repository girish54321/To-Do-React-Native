import React from 'react';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { goBack } from '../../navigation/NavigationService';

export declare type AppAppBarType = {
    navigation: any,
    back?: any,
    options?: any,
    route?: any,
};

export const CustomNavigationBar: React.FC<AppAppBarType> = ({ navigation, route, options, back }) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};

export const DefaultAppBar = () => {
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={goBack} />
        </Appbar.Header>
    );
};
