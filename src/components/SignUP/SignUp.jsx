
const SignUp = () => {
    const handleGoogleSignUp = () => {
        console.log('I am okay.');
    }

    return (
        <div>
            <button onClick={handleGoogleSignUp} className="my-6 btn">Login With Google</button>
        </div>
    );
};

export default SignUp;