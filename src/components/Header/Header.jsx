import { Link, NavLink } from "react-router";

const Header = () => {
  const items = [
    <li><NavLink to="/" className="btn btn-outline btn-success">Home</NavLink></li>,
    <li><NavLink to="/listedBooks" className="btn btn-outline btn-success">Listed Books</NavLink></li>,
    <li><NavLink to="/pagesToRead" className="btn btn-outline btn-success">Pages to Read</NavLink></li>
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
        <a className="btn btn-active btn-success">Sign In</a>
        <Link to='/signUp' className="btn btn-active btn-info">Sign Up</Link>
      </div>
    </div>
  );
};

export default Header;
