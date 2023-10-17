import auth from '@react-native-firebase/auth';

export const firebaseSignUp = async (email: string, password: string) => {
  try {
    return await auth().createUserWithEmailAndPassword(email, password);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    } else {
      console.error(error);
    }
    throw error;
  }
};

export const firebaseSignIn = async (email: string, password: string) => {
  try {
    return await auth().signInWithEmailAndPassword(email, password);
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const firebaseLogOut = async () => {
  const response = await auth().signOut();
  console.log('LogOut Successfully', response);
};
