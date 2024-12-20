import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomNavigationBar } from '../../components/appAppBar/AppAppBar';
import { Route } from '../../constants/Route';
import { UsersScreen } from '../../screens/TodoList/TodoListScreen';
import { SelectedUserScreen } from '../../screens/TodoList/SelectedUser';

const UserStack = createNativeStackNavigator();

export const UsersListStack = () => {
    const { t } = useTranslation();
    return (
        <UserStack.Navigator
            screenOptions={{
                title: t('users'),
                header: (props) => <CustomNavigationBar {...props} />,
            }}
        >
            <UserStack.Screen name={Route.USERSCREEN} component={UsersScreen} />
            <UserStack.Screen name={Route.SELECTEDUSERSCREEN} component={SelectedUserScreen} />
        </UserStack.Navigator>
    );
};

