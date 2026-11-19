import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { loginUser, logoutUser, registerUser } from '../services/authService';
import { isLocalMode } from '../helpers/config';
import { localGetSession } from '../services/localStore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLocalMode) {
      setUser(localGetSession());
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (name, email, password) => {
    const currentUser = await registerUser(name, email, password);
    if (isLocalMode) {
      setUser(currentUser);
    }
    return currentUser;
  };

  const login = async (email, password) => {
    const currentUser = await loginUser(email, password);
    if (isLocalMode) {
      setUser(currentUser);
    }
    return currentUser;
  };

  const logout = async () => {
    await logoutUser();
    if (isLocalMode) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, isLocalMode }}>
      {children}
    </AuthContext.Provider>
  );
};
