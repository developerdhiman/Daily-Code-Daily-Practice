import { createUserWithEmailAndPassword } from "firebase/auth";
import SignUpGoogle from "./SignUpGoogle/SignUpGoogle";
import auth from "../../firebase/firebase.init";
import { useState } from "react"; // It's good practice to keep useState if you plan to use it later for messages/errors

const SignUp = () => {
  // You might want to use state to display messages or errors to the user
  const [signUpMessage, setSignUpMessage] = useState("");
  const [signUpError, setSignUpError] = useState("");


  const handleFormSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value; // Corrected: .value
    const password = e.target.password.value;
    console.log("Attempting sign-up with:", email, password); // Good for debugging

    // Clear previous messages
    setSignUpMessage("");
    setSignUpError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log("Sign-up successful! User:", user);
        setSignUpMessage("Sign-up successful! Welcome, " + user.email);
        // You might want to redirect the user or update UI here
      })
      .catch(error => {
        const errorMessage = error.message;
        console.error("Sign-up error:", errorMessage);
        setSignUpError("Sign-up failed: " + errorMessage);
        // Display the error message to the user
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required/>
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Sign Up</button>
                {/* Display messages to the user */}
                {signUpMessage && <p className="text-green-500 mt-2">{signUpMessage}</p>}
                {signUpError && <p className="text-red-500 mt-2">{signUpError}</p>}
                <hr className="border-t-2 border-white my-4" />
                <SignUpGoogle></SignUpGoogle>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;