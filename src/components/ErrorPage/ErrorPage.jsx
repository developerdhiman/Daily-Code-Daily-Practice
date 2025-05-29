import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div className="bg-gray-100 h-lvh font-extrabold text-4xl flex flex-col items-center justify-center">
            <h2>Page Not Found</h2>
            <Link to="/">
                <button className="btn btn-error mt-7">Back To Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;