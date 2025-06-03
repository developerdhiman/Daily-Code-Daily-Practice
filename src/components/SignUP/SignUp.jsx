import { createUserWithEmailAndPassword } from "firebase/auth";
import SignUpGoogle from "./SignUpGoogle/SignUpGoogle";
import auth from "../../firebase/firebase.init";
import { useState } from "react";

const SignUp = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.valu;
    const password = e.target.password.value;
    console.log(email, password);

    createUserWithEmailAndPassword(auth, email, password)
    .then(results => setData(results))
    .catch(error => setError(error));


    console.log(error);

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
