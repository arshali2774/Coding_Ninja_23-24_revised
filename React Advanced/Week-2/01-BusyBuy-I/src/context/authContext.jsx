/* eslint-disable react/prop-types */
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // getting details of logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  // logout the logged in user
  const logout = () => signOut(auth);
  return (
    <AuthContext.Provider value={{ currentUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
