import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../config/firebase.config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { logout, setCurrentUser } from './authSlice';

// Thunk to listen to auth state changes
export const listenToAuthChanges = createAsyncThunk(
  'auth/listenToAuthChanges',
  async (_, { dispatch }) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCurrentUser(user.email)); // Dispatch action to update current user
      } else {
        dispatch(setCurrentUser(null));
      }
    });
  }
);
// Thunk for user logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      return userCredential.user.email;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredential.user.email;
    } catch (error) {
      // Return a custom error message
      return rejectWithValue(error.message);
    }
  }
);
