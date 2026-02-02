import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Sun, Moon } from "lucide-react";

export default function Navbar({ scrollPositionY }) {
  // states
  const [isDark, setIsDark] = useState(true);
  // functionalities
  function handleToggleTheme() {
    setIsDark(!isDark);
  }
  const user = true;
  const isAdmin = true;

  const navLinkStyles = ({ isActive }) => ({
    borderBottom: isActive ? "2px solid #A100FF" : "2px solid transparent",
    transition: "border-color 0.3s ease, border-bottom-width 0.3s ease",
  });

  return (
    // This is Navigation bar
    /**
     * This Navigation bar will use in Home routes in home page
     */
    <div
      className={`  ${
        scrollPositionY >= 100
          ? " transition-all delay-75 ease-in duration-150 bg-white/30 backdrop-blur-sm rounded-full px-6 py-2 w-fit flex flex-row gap-6 items-center justify-center border border-yellow-50 "
          : " transition-all delay-75 ease-out duration-200 bg-white/30 backdrop-blur-md px-6 py-3 z-3 w-full h-full flex flex-row items-center justify-between gap-6"
      } `}>
      {/* logo */}
      <div
        className={`flex flex-row items-center justify-center ${
          scrollPositionY >= 100 ? "hidden" : ""
        } `}>
        <span>IPTV Player</span>
      </div>
      {/* menu */}
      <div
        className={`flex items-center ${
          scrollPositionY >= 100 ? " w-full  justify-end" : ""
        }`}>
        <ul className="flex flex-row items-center gap-6 ">
          <li className={" hover:text-[#A100FF] "}>
            <NavLink style={navLinkStyles} to={`/home`} end>
              <span>Home</span>
            </NavLink>
          </li>
          <li className={" hover:text-[#A100FF] "}>
            <NavLink style={navLinkStyles} to={`/home/iptv-player/streams`}>
              <span>Streams</span>
            </NavLink>
          </li>
          <li className={" hover:text-[#A100FF] "}>
            <NavLink style={navLinkStyles} to={`/home/iptv-player/channels`}>
              <span>Channels</span>
            </NavLink>
          </li>
          <li className={" hover:text-[#A100FF] "}>
            <NavLink style={navLinkStyles} to={`/home/iptv-player/saved`}>
              <span>Saved</span>
            </NavLink>
          </li>
          <li className={" hover:text-[#A100FF] "}>
            <NavLink style={navLinkStyles} to={`/home/iptv-player/player`}>
              <span>Player</span>
            </NavLink>
          </li>
          <li className={" hover:text-[#A100FF] "}>
            <NavLink style={navLinkStyles} to={`/home/iptv-player/library`}>
              <span>Library</span>
            </NavLink>
          </li>
          <li
            className={` hover:text-[#A100FF]  ${
              scrollPositionY >= 100 ? "hidden" : ""
            }`}>
            <NavLink style={navLinkStyles} to={`/home/iptv-player/about`}>
              <span>About</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* user specific */}
      <div
        className={`flex items-center ${
          scrollPositionY >= 100 ? " w-full  justify-end" : ""
        }`}>
        <ul className="flex flex-row items-center gap-6 ">
          <li
            className={` hover:text-[#A100FF] ${
              scrollPositionY >= 100 ? "hidden" : ""
            }`}>
            <Link to={`/dashboard`}>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={" hover:text-[#A100FF] "}>
            <NavLink style={navLinkStyles} to={`/home/iptv-player/profile`}>
              <span>Profile</span>
            </NavLink>
          </li>
          <li className={" hover:text-[#A100FF] "}>
            <span>Signout</span>
            {/* <Link to={`/signout`}>
            </Link> */}
          </li>
        </ul>
      </div>
      {/* extra */}
      <div
        className={` flex items-center justify-center  ${
          scrollPositionY >= 100
            ? "flex flex-row items-center justify-center gap-6 "
            : "flex flex-row items-center justify-center gap-6"
        }`}>
        <button
          className=" cursor-pointer flex w-full items-center justify-center"
          onClick={handleToggleTheme}>
          {isDark ? (
            <span className="flex items-center justify-center">
              <Sun />
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Moon />
            </span>
          )}
        </button>
        <button
          className={`flex w-full items-center justify-center ${
            scrollPositionY >= 100 ? "hidden" : ""
          } `}>
          <a href={"https://arif-miah-portfolio.vercel.app/"} target="_blank">
            <span>Portfolio</span>
          </a>
        </button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  scrollPositionY: PropTypes.number.isRequired,
};
