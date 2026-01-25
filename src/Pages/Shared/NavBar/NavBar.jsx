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

  const baseTextColor = isSticky
    ? "text-purple-500 lg:text-white"
    : "text-black";

  const getNavLinkClass = ({ isActive }) =>
    `
      mx-2 px-3 py-1 rounded text-md transition-colors
      ${
        isActive
          ? "bg-white text-green-600 font-semibold border border-green-400"
          : `${baseTextColor} hover:bg-green-400 hover:text-white`
      }
    `;

  return (
    <nav className="relative z-20 w-full h-full flex flex-row items-center justify-center">
      <div
        className={`${
          isSticky
            ? "flex flex-row items-center justify-center gap-4 rounded-full fixed top-0 left-1/2 -translate-x-1/2 w-[100px] md:w-[100px] lg:w-[800px] h-[50px] border border-red-50 z-20 shadow-md bg-white/30 backdrop-blur-md px-6 py-1 isolate"
            : "w-full navbar p-0 min-h-0 transition-all duration-300 ease-in-out shadow-md bg-white/30 backdrop-blur-md isolate"
        }`}>
        <div
          className={`navbar-start md:p-0 ${
            isSticky ? "  absolute left-1/2 -translate-x-1/2  " : ""
          } `}>
          <div className={`dropdown`}>
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
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white  rounded-box w-52">
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
                <NavLink to="/search" className={getNavLinkClass}>
                  Search
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
          <Link
            to="/"
            className={`btn btn-ghost text-md lg:text-lg font-medium lg:font-bold ${
              isSticky ? "text-white hidden" : "text-black visible"
            }`}>
            <p className="flex items-center">IPTV Player</p>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex ">
          <ul
            key={currentPath + "-desktop"}
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
              <NavLink to="/search" className={getNavLinkClass}>
                Search
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

        <div
          className={` navbar-end pr-4 flex flex-row items-center justify-end ${
            isSticky ? "hidden" : "visible"
          } `}>
          <Link
            to="https://arif-miah-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${
              isSticky ? "text-white hidden" : "text-black visible"
            }`}>
            <p className="flex hover:text-purple-500">Portfolio</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
