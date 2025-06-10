import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";

const Header = () => {
  const {user, logOutUser} = useContext(AuthContext);

  const handleSignOut = () => {
    logOutUser()
    .then(() => {
      console.log('sign out successfully')
    })
    .catch(error => {
      console.log(error.message);
    }
  )
  }

  const items = [
    <li>
      <NavLink to="/" className="btn btn-outline btn-success">
        Home
      </NavLink>
    </li>,
    <li>
      <NavLink to="/listedBooks" className="btn btn-outline btn-success">
        Listed Books
      </NavLink>
    </li>,
    <li>
      <NavLink to="/pagesToRead" className="btn btn-outline btn-success">
        Pages to Read
      </NavLink>
    </li>,
  ];

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {items}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Book Vibe</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-10">{items}</ul>
      </div>
      <div className="navbar-end gap-5">
        {user ? (
          <>
            {user?.email} <button onClick={handleSignOut}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/signIn" className="btn btn-active btn-success">
              Sign In
            </Link>
            <Link to="/signUp" className="btn btn-active btn-info">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
