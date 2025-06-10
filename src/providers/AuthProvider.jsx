import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useState } from "react";
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

  //context-value-start
  const authInfo = {
    createUser,
    logInUser,
  };
  //context-value-end

  //observer-start
  onAuthStateChanged(auth, currentUser => {
    if(currentUser) {
      console.log(currentUser);
      setUser(currentUser)
    }
    else{
      console.log(currentUser);
      setUser(null);
    }
  })
  //observer-start

  console.log(user);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
