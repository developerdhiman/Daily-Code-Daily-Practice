import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../../firebase/firebase.init";
import { useState } from "react";

const SignUpGoogle = () => {
  const [user, setUser] = useState("");
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((results) => setUser(results.user))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <button onClick={handleGoogleSignUp} className="my-6 btn">
        Login With Google
      </button>
      <p>{user.displayName}</p>
      <h2>{user.email}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
};

export default SignUpGoogle;
