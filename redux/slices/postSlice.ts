// authenticationSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState = {
  posts: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    clearPosts: state => {
      state.posts = null;
    },
  },
});

export const {setPosts, clearPosts} = authenticationSlice.actions;
export const selectUser = (state: RootState) => state.authentication.user;
export default authenticationSlice.reducer;
