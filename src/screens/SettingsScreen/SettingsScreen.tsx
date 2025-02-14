import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { DARK_THEME_TYPE, themSlice } from '../../redux/themeStore/reducers';
import { authSlice } from '../../redux/authStore/authReducers';
import { AppView } from '../../components/Flex/Flex';
import LanguageSelector from '../../components/LanguageSelector';
import SizedBox from '../../components/SizedBox';
import ProfileView from '../../components/profileView/ProfileView';
import { navigate } from '../../navigation/NavigationService';
import { Route } from '../../constants/Route';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONST } from '../../Config/Colors';
import { useProfileQuery } from '../../Network/Querys/useLoginMutaion';

const SettingsScreen = () => {
  const appDispatch = useDispatch();
  const data: DARK_THEME_TYPE = useSelector((state: any) => state.themeReducer);
  const { data: userData, refetch } = useProfileQuery();

  const { t } = useTranslation();
  const authDispatch = useDispatch();
  const toggleSwitch = (value: boolean) => {
    appDispatch(themSlice.actions.changeThemAction(value));
  };

  useEffect(() => {
    refetch();
  }, [])

  const logOutUse = () => {
    AsyncStorage.removeItem(APP_CONST.USER_LOGIN);
    authDispatch(authSlice.actions.userLoginLogOutAction());
  };

  const removeUser = () => {
    Alert.alert(
      'Sing Out?',
      'Are your sure.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'yes',
          onPress: () => logOutUse(),
        },
      ],
      { cancelable: false },
    );
  };

  const goToProfile = () => navigate(Route.PROFILE_SCREEN);

  const switchButton = () => <Switch value={data.isDarkTheme} onValueChange={toggleSwitch} />;

  const themIcon = (props: any) => <List.Icon {...props} icon="theme-light-dark" />;

  const exitButton = (props: any) => <List.Icon {...props} icon="exit-to-app" />;

  return (
    <AppView>
      <View
        style={styles.rootView}>
        <ProfileView onPress={goToProfile} data={userData?.data} />
        <SizedBox size={12} />
        <LanguageSelector />
        <List.Item
          onPress={() => {
            const jsonValue = JSON.stringify({ isDarkTheme: !data.isDarkTheme });
            AsyncStorage.setItem(APP_CONST.CHECK_THEME, jsonValue);
            appDispatch(themSlice.actions.changeThemAction(!data.isDarkTheme));
          }}
          title={t('darkLightMode')}
          description={t('changeAppTheme')}
          left={themIcon}
          right={switchButton}
        />
        <List.Item
          onPress={removeUser}
          title={t('logOut')}
          description={t('singOut')}
          left={exitButton}
        />
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  cardStyle: {
    margin: 12
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
});

export default SettingsScreen;

