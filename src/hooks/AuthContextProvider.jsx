import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";

import { useState } from "react";
import { useEffect } from "react";
import { app } from "../firebase/Firebase.config";
import LoaderScreen from "../others/LoadingScree";
import { AnimatePresence } from "framer-motion";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginChecking, setLoginChecking] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user in the auth state changed", currentUser);

      const timeout = setTimeout(() => {
        setLoginChecking(false);
        setUser(currentUser);
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    });

    return () => {
      unSubscribe();
    };
  }, [loginChecking]);

  const signUp = async (email, password, displayName) => {
    setLoginChecking(false);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      await updateProfile(user, { displayName });

      setUser(user);

      return userCredential;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const signIn = (email, password) => {
    setLoginChecking(false);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoginChecking(false);
    return signInWithPopup(auth, googleProvider);
  };
  const githubSignIn = () => {
    setLoginChecking(false);
    return signInWithPopup(auth, githubProvider);
  };

  const logout = () => {
    setLoginChecking(false);
    return signOut(auth);
  };

  const authInfo = {
    googleSignIn,
    user,
    setUser,
    githubSignIn,
    signUp,
    signIn,
    logout,
    loginChecking,
    setLoginChecking,
  };
  if (loginChecking) {
    return (
      <AnimatePresence>
        <LoaderScreen key={loginChecking} />
      </AnimatePresence>
    );
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
