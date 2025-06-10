import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  //All-state
  const [user, setUser] = useState(null);

  //create-user-start
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //create-user-end

  //signIn-user-start
  const logInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //signIn-user-end

  //log-out-user
  const logOutUser = () => {
    return signOut(auth);
  }
  //log-out-end

  //context-value-start
  const authInfo = {
    user,
    createUser,
    logInUser,
    logOutUser
  };
  //context-value-end

  //observer-start
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  //observer-end

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
