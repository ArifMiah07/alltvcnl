import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "../../../Components/themes/ThemeToggle";
import { Bell, Settings, SquareUserRound } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isSticky, setIsSticky] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = false;

  // minimize nav in scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 144) {
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
    ? "text-purple-500 lg:text-white dark:text-white"
    : "text-black dark:text-white";

  const getNavLinkClass = ({ isActive }) =>
    `
      mx-2 px-3 py-1 rounded text-md transition-colors
      ${
        isActive
          ? " text-green-600 font-semibold border border-green-400"
          : `${baseTextColor} hover:bg-green-400 hover:text-white`
      }
    `;

  //
  const isUserSeenNewItem = false;

  // handler
  const handleProfileOpen = () => {
    setIsProfileOpen(!isProfileOpen);
    console.log(isProfileOpen);
  };

  return (
    <nav className="dark:bg-black relative z-20 w-full h-full flex flex-row items-center justify-center">
      <div
        className={`${
          isSticky
            ? "flex flex-row items-center justify-center gap-4 rounded-full fixed top-0 left-1/2 -translate-x-1/2 w-[100px] md:w-[100px] lg:w-[800px] h-[50px] border border-red-50 z-20 shadow-md bg-white/30 dark:bg-black backdrop-blur-md px-6 py-1 isolate"
            : "w-full navbar p-0 min-h-0 transition-all duration-0 ease-in shadow-md bg-white/30 backdrop-blur-md isolate"
        }`}>
        <div
          className={`navbar-start md:p-0 ${
            isSticky
              ? " dark:text-white absolute left-1/2 -translate-x-1/2  "
              : ""
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
              className="menu menu-sm dropdown-content mt-3 p-2  shadow bg-white dark:bg-black  rounded-box w-52">
              <li>
                <NavLink to="/home" className={getNavLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/stream-iptv" className={getNavLinkClass}>
                  Stream Iptv
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
              {/* <li>
                <NavLink to="/v-player" className={getNavLinkClass}>
                  VPlayer
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/favorites" className={getNavLinkClass}>
                  Favorites
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
              isSticky
                ? "text-white hidden dark:text-black"
                : "text-black dark:text-white visible"
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
              <NavLink to="/stream-iptv" className={getNavLinkClass}>
                Stream Iptv
              </NavLink>
            </li>
            <li className="relative">
              <NavLink to="/library" className={getNavLinkClass}>
                Library
                {!isUserSeenNewItem ? (
                  <span className="w-6 h-6 bg-green-500 absolute -top-2 -right-1 flex flex-row items-center justify-center rounded-full border ">
                    <span className=" tooltip text-[12px] text-white ">
                      <p className="tooltiptext text-sm">
                        New item has been added
                      </p>
                      1
                    </span>{" "}
                  </span>
                ) : (
                  ""
                )}
                {/* 
                  
                  ___________TODO___________:

                  system design :: 
                  task: show a static number if library page got a new item
                  how to handle ::
                  count current total item and define isUserNotifiedAndSeen = false
                  , store it in local storage
                  introduce a global event that check if user is visiting /library path
                  if user visits /library path update current total item in library page
                  and also update isUserNotifiedAndSeen = true and clear notifies number
                  and also clear local storage
                  
                  
                  */}
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={getNavLinkClass}>
                Search
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/v-player" className={getNavLinkClass}>
                VPlayer
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/favorites" className={getNavLinkClass}>
                Favorites
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
            <p className="flex dark:text-white hover:text-purple-500">
              Portfolio
            </p>
          </Link>
          <div className="ml-2">
            <Bell className="dark:text-white w-[16px] h-[16px]" />
          </div>
          <div className="ml-2">
            <ThemeToggle className="" />
          </div>
          {/* profile */}
          <div className="relative ml-2">
            {/* The Trigger Icon */}
            <div onClick={handleProfileOpen} className="cursor-pointer">
              <SquareUserRound className="dark:text-white w-[16px] h-[16px]" />
            </div>

            {/* The Modal */}
            {!user && isProfileOpen && (
              <div
                className=" w-[100vw] h-[120vh] absolute -top-10 -right-10  z-[99999] flex items-center justify-center bg-black/40"
                onClick={() => setIsProfileOpen(false)} // Close when clicking the backdrop
              >
                <div
                  className=" relative w-[60vw] h-[40vh] bg-white dark:bg-slate-800 p-10 border border-red-500"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the content
                >
                  <div className="flex flex-col gap-2 ">
                    {/* register */}
                    <button className="border border-green-600 hover:bg-purple-600 hover:text-white ">
                      <Link to={"/auth/register"}>Register</Link>
                    </button>
                    {/* login */}
                    <button className="border border-green-600 hover:bg-purple-600 hover:text-white">
                      <Link to={"/auth/login"}>Login</Link>
                    </button>
                  </div>
                  <button
                    className="absolute top-2 right-2"
                    onClick={() => setIsProfileOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="ml-2">
            <Settings className="dark:text-white w-[16px] h-[16px]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
