import {combineReducers} from '@reduxjs/toolkit';
import authenticationReducer from './authSlice';

const rootReducer = combineReducers({
  user: authenticationReducer,
});

export default rootReducer;
