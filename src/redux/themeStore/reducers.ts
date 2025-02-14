import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APP_CONST } from '../../Config/Colors';

export interface DARK_THEME_TYPE {
  isDarkTheme: boolean
}

const INITIAL_STATE: DARK_THEME_TYPE = {
  isDarkTheme: false,
};

const changeThemAction = (state: DARK_THEME_TYPE, action: any) => {
  console.log("change the", action.payload);

  return {
    ...state,
    isDarkTheme: action.payload,
  };
};

const checkThemAction = (state: DARK_THEME_TYPE, action: PayloadAction<boolean>) => {
  return {
    ...state,
    isDarkTheme: action.payload,
  };
};


export const themSlice = createSlice({
  name: 'themSlice',
  initialState: INITIAL_STATE,
  reducers: {
    changeThemAction: (state, action: PayloadAction<boolean>) => {
      return changeThemAction(state, action);
    },
    checkThemAction: (state, action: PayloadAction<boolean>) => {
      return checkThemAction(state, action);
    },
  },
});


export default themSlice.reducer;
