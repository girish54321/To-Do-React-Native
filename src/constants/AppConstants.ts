import { NativeModules } from 'react-native';
const Flavor = NativeModules.RNConfigModule;

export function getBaseUrl() {
    // return `${Flavor.BASE_URL}api/v1/`;
    return 'http://localhost:2000/api/v1/';
}

export function getEnvironmentVariable() {
    return Flavor.BUILD_ENV === 'DEV' ? true : false;
}
