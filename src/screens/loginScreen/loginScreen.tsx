import React from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import SizedBox from '../../components/SizedBox';
import useLoginScreenModal from './useLoginScreenModal';

export const loginTetIds = {
  rootView: 'root-view',
  rootViewTwo: 'root-view-two',
  loginView: 'login-view',
  envView: 'env-view',
  emailInput: 'email-input',
  passwordInput: 'password-input',
  loginButton: 'login-button',
  loadingText: 'loading-text',
};


export const LoginScreen = () => {
  const { paperTheme,
    userData,
    saveUserLogin,
    textEmailChange,
    textPasswordChange,
    isLoading,
    nativeData } = useLoginScreenModal();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles?.rootView}
      testID={loginTetIds.rootView}>
      <View style={styles.rootViewTwo} testID={loginTetIds.rootViewTwo} />
      <View style={styles.loginView} testID={loginTetIds.loginView}>
        <TouchableOpacity style={styles.envView} testID={loginTetIds.envView}>
          <Text>Running {nativeData?.BUILD_ENV}</Text>
          <Text>Your Base URL is {nativeData?.BASE_URL}</Text>
        </TouchableOpacity>
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          label="Email"
          autoCapitalize="none"
          value={userData.email}
          placeholder="Email"
          onChangeText={textEmailChange}
          testID={loginTetIds.emailInput}
        />
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          secureTextEntry={userData.secureTextEntry}
          label="Password"
          placeholder="Password"
          autoCapitalize="none"
          value={userData.password}
          onChangeText={textPasswordChange}
          testID={loginTetIds.passwordInput}
        />
        <SizedBox size={16} />
        {isLoading ? (
          <Text testID={loginTetIds.loadingText}>Loading..</Text>
        ) : (
          <Button
            mode="contained"
            onPress={() => saveUserLogin()}
            testID={loginTetIds.loginButton}>
            Login
          </Button>
        )}
      </View>
      <View style={styles.flexOne} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  rootView: {
    flex: 1,
    paddingHorizontal: 34,
    justifyContent: 'center',
  },
  rootViewTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: { flex: 1, marginHorizontal: 22 },
  envView: { justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 },
});

