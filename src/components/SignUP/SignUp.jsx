import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.init";

const SignUp = () => {
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((results) => console.log(results))
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
