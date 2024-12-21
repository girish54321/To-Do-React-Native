import React from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
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
  const {
    userData,
    saveUserLogin,
    isSignUp,
    textEmailChange,
    createAccount,
    textPasswordChange,
    onFirstNameChange,
    onLastNmaeChange,
    isLoading,
    nativeData } = useLoginScreenModal();

  return (
    <SafeAreaView
      style={styles?.rootView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles?.rootView}
        testID={loginTetIds.rootView}>
        <View style={styles.rootViewTwo} testID={loginTetIds.rootViewTwo} />
        <View style={styles.loginView} testID={loginTetIds.loginView}>
          <TouchableOpacity testID={loginTetIds.envView}>
            <Text>Running {nativeData?.BUILD_ENV}</Text>
            <Text>Your Base URL is {nativeData?.BASE_URL}</Text>
          </TouchableOpacity>
          {isSignUp && <TextInput
            style={styles.inputStyle}
            label="First Name"
            autoCapitalize="none"
            mode="outlined"
            value={userData.firstName}
            placeholder="First Name"
            onChangeText={onFirstNameChange}
            testID={loginTetIds.emailInput}
          />}
          {isSignUp && <TextInput
            style={styles.inputStyle}
            label="Last Name"
            autoCapitalize="none"
            mode="outlined"
            value={userData.lastName}
            placeholder="Last Name"
            onChangeText={onLastNmaeChange}
            testID={loginTetIds.emailInput}
          />}
          <TextInput
            style={styles.inputStyle}
            label="Email"
            autoCapitalize="none"
            mode="outlined"
            value={userData.email}
            placeholder="Email"
            onChangeText={textEmailChange}
            testID={loginTetIds.emailInput}
          />
          <TextInput
            style={styles.inputStyle}
            secureTextEntry={userData.secureTextEntry}
            label="Password"
            placeholder="Password"
            mode="outlined"
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
        <Button onPress={createAccount}>
          {isSignUp ? 'Have an accoun? Login in' : `Don't Have Account? Create One.`}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  inputStyle: {
    marginTop: 12,
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

