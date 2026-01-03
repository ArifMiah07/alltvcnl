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

  const baseTextColor = isSticky ? "text-white" : "text-black";

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
    <nav className="z-19 w-full h-full flex flex-row items-center justify-center">
      <div
        className={`${
          isSticky
            ? "flex flex-row gap-4 rounded-full fixed top-0 left-1/2 -translate-x-1/2 lg:w-fit z-50 shadow-md bg-white/30 backdrop-blur-md px-6 py-1 z-11"
            : "w-full z-11 navbar p-0 min-h-0 transition-all duration-300 ease-in-out shadow-md bg-white/30 backdrop-blur-md"
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
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
          <Link
            to="/"
            className={`btn btn-ghost text-xl font-bold ${
              isSticky ? "text-white hidden" : "text-black visible"
            }`}>
            <p className="flex">IPTV Player</p>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
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

        <div className="navbar-end pr-4 flex flex-row items-center justify-end">
          <Link
            to="https://arif-miah-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${
              isSticky ? "text-white hidden" : "text-black visible"
            }`}>
            <p className="flex">Portfolio</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
