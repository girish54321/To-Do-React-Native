import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

const ErrorView = ({ errorMessage, onRetry }: {
  errorMessage: string,
  onRetry: () => void,
}) => {
  return (
    <View style={style.manView} >
      <Text style={style.errorText}>{errorMessage || 'Something went wrong!'}</Text>
      <Button onPress={onRetry} >
        Retry
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  manView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorText: {
    fontSize: 16,
    color: '#d9534f',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ErrorView;
