import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRes } from '../../models/responseType/LoginRes';

export interface AUTH_TYPE {
  isLoading: boolean;
  userLoggedIn: boolean;
  loginRes?: LoginRes | null
}

const INITIAL_STATE: AUTH_TYPE = {
  isLoading: true,
  userLoggedIn: false,
  loginRes: null,
};


export const authSlice = createSlice({
  name: 'authSlice',
  initialState: INITIAL_STATE,
  reducers: {
    userLoginAction: (state, action: PayloadAction<AUTH_TYPE>) => {
      return { ...state, ...action.payload };
    },
    checkUserLoginAction: (state, action: PayloadAction<AUTH_TYPE | null>) => {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    },
    userLoginLogOutAction: (state) => {
      return {
        ...state,
        isLoading: false,
        userLoggedIn: false,
        userName: null,
        email: null,
      };
    },
  },
});


export default authSlice.reducer;
