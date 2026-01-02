import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "mx-2 bg-white text-green-600 font-semibold border border-green-400 rounded"
      : "mx-2 text-purple-600 lg:text-white hover:bg-green-400 hover:text-white";

  return (
    <div
      className={` z-11 navbar p-0 bg-green-500 text-white transition-all duration-300 ease-in-out ${
        isSticky ? "fixed top-0 left-0 z-50 shadow-md bg-green-500 " : ""
      }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            key={currentPath + "-mobile"}
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52">
            <li>
              <NavLink to="/home" className={getNavLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/iptv" className={getNavLinkClass}>
                Watch IPTV
              </NavLink>
            </li>
            <li>
              <NavLink to="/library" className={getNavLinkClass}>
                Library
              </NavLink>
            </li>
            <li>
              <NavLink to="/v-player" className={getNavLinkClass}>
                VPlayer
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved-channels" className={getNavLinkClass}>
                Saved Channels
              </NavLink>
            </li>
            <li>
              <NavLink to="/more" className={getNavLinkClass}>
                Channel List
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getNavLinkClass}>
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl text-white font-bold">
          IPTV Player
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul
          key={currentPath + "-desktop"} //  force re-render on path change
          className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/home" className={getNavLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/iptv" className={getNavLinkClass}>
              Watch IPTV
            </NavLink>
          </li>
          <li>
            <NavLink to="/library" className={getNavLinkClass}>
              Library
            </NavLink>
          </li>
          <li>
            <NavLink to="/v-player" className={getNavLinkClass}>
              VPlayer
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved-channels" className={getNavLinkClass}>
              Saved Channels
            </NavLink>
          </li>
          <li>
            <NavLink to="/more" className={getNavLinkClass}>
              Channel List
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={getNavLinkClass}>
              About
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end mx-4">
        <Link
          to="https://arif-miah-portfolio.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline">
          Portfolio
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
