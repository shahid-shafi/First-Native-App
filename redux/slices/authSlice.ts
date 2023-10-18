// authenticationSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState = {
  user: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
  },
});

export const {setUser, clearUser} = authenticationSlice.actions;
export const selectUser = (state: RootState) => state.authentication.user;
export default authenticationSlice.reducer;
