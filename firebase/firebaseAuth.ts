// authenticationActions.js
import {setUser, clearUser} from '../redux/slices/authSlice';
import {Dispatch} from 'redux';

import {
  firebaseSignUp,
  firebaseSignIn,
  firebaseLogOut,
} from '../redux/reducers/AuthReducers';

export const signUp =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const userCredential = await firebaseSignUp(email, password);
      console.log('User Credentials', userCredential);
      dispatch(setUser(userCredential?.user));
    } catch (error) {
      console.error(error);
    }
  };

export const signIn =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const userCredential = await firebaseSignIn(email, password);
      const user = userCredential.user;
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const signOut = () => async (dispatch: Dispatch) => {
  try {
    await firebaseLogOut();
    dispatch(clearUser());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
