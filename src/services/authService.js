import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';
import { isLocalMode } from '../helpers/config';
import { localLogin, localLogout, localRegister } from './localStore';

export const registerUser = async (name, email, password) => {
  if (isLocalMode) {
    return localRegister(name, email, password);
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

export const loginUser = async (email, password) => {
  if (isLocalMode) {
    return localLogin(email, password);
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async () => {
  if (isLocalMode) {
    return localLogout();
  }

  await signOut(auth);
};
