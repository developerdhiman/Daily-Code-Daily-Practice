import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";

const SignIn = () => {
  const [message, setMessage] = useState("");
  const [showForgotPasswordEmailInput, setShowForgotPasswordEmailInput] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Clear previous data
    setMessage("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setMessage(`Login SuccessFully: ${user.email}`);
        console.log("Login SuccessFully", user);
      })
      .catch((error) => {
        setMessage(`Login Failed: ${error.message}`);
        console.error("Login Failed", error.message);
      });
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      setMessage("Please enter your email address.");
      return;
    }
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      setMessage("Password reset email sent. Check your inbox.");
      setShowForgotPasswordEmailInput(false); // Hide input after sending
      setForgotPasswordEmail(""); // Clear the input
    } catch (error) {
      setMessage(`Error sending password reset email: ${error.message}`);
      console.error("Forgot Password Failed", error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogIn} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <div>
                <a
                  href="#"
                  className="link link-hover"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowForgotPasswordEmailInput(true);
                    setMessage("");
                  }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Message Display */}
              {message && (
                <p className={`mt-2 ${message.startsWith("Error") || message.startsWith("Login Failed") ? "text-red-500" : "text-green-500"}`}>
                  {message}
                </p>
              )}

              <button type="submit" className="btn btn-neutral mt-4">Login</button>
            </form>

            {/* Forgot Password Form */}
            {showForgotPasswordEmailInput && (
              <div className="mt-4">
                <label className="label">Email for Password Reset</label>
                <input
                  type="email"
                  name="forgotPasswordEmail"
                  className="input"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                />
                <button
                  onClick={handleForgotPassword}
                  className="btn btn-neutral mt-2 w-full"
                >
                  Send Reset Email
                </button>
                <button
                  onClick={() => {
                    setShowForgotPasswordEmailInput(false);
                    setMessage("");
                    setForgotPasswordEmail("");
                  }}
                  className="btn btn-ghost mt-2 w-full"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
