import { createSlice } from '@reduxjs/toolkit';

export interface APP_STATE {
  isLoading: boolean;
  showModalSheet: boolean;
}

const INITIAL_STATE: APP_STATE = {
  isLoading: false,
  showModalSheet: false,
};


export const appSlice = createSlice({
  name: 'appSlice',
  initialState: INITIAL_STATE,
  reducers: {
    showLoaderAction: (state) => {
      return { ...state, isLoading: true };
    },
    hideLoaderAction: (state) => {
      return { ...state, isLoading: false };
    },
  },
});


export default appSlice.reducer;
