import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONST } from '../Config/Colors';

const apiHeader = async () => {
    try {
        const token = await AsyncStorage.getItem(APP_CONST.TOKENS);
        return {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        };
    } catch (error) {
        console.error('Error fetching token from AsyncStorage:', error);
        return {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
    }
};

export default apiHeader;
