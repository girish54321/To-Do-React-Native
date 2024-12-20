import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomNavigationBar } from '../../components/appAppBar/AppAppBar';
import { Route } from '../../constants/Route';
import { UsersToDoScreen } from '../../screens/UsersScreen/UsersScreen';
import { CreateTodoScreen } from '../../screens/CreateTodoScreen/CreateTodoScreen';
import SelectedToDoScreen from '../../screens/SelectedToDoScreen/SelectedToDoScreen';

const HomeStack = createNativeStackNavigator();
const AppHeader = ({ props }: { props: any }) => {
    return <CustomNavigationBar {...props} />;
};

export const HomeScreenStack = () => {
    const { t } = useTranslation();


    return (
        <HomeStack.Navigator
            screenOptions={{
                title: t('starterApp'),
                header: (props) => <AppHeader props={props} />,
            }}
        >
            <HomeStack.Screen name={Route.WELCOME} component={UsersToDoScreen} />
            <HomeStack.Screen name={Route.CREATE_TODO} component={CreateTodoScreen} />
            <HomeStack.Screen name={Route.SELECT_TODO} component={SelectedToDoScreen}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    );
};

