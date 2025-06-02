import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";

const SignUp = () => {
  const provider = new GoogleAuthProvider();
  const [userData, setUserdata] = useState(null);

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((results) => setUserdata(results))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button onClick={handleGoogleSignUp} className="my-6 btn">
        Login With Google
      </button>
      <h2>{userData.displayName}</h2>
    </div>
  );
};

export default SignUp;
