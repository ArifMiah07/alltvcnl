import { Link } from "react-router-dom";
// import { NavMenuButton } from "../buttons/CustomButtons";

import logo1 from "../../assets/logo/facebook.png";
import logo2 from "../../assets/logo/instagram.png";
import logo3 from "../../assets/logo/tiktok.png";
import logo4 from "../../assets/logo/twitch.png";
import logo5 from "../../assets/logo/x.png";
import logo6 from "../../assets/logo/youtube.png";

import { motion } from "motion/react";
import PropTypes from "prop-types";

export default function PlayAndDownloadVideo({ handleSectionVisibility }) {
  return (
    <section className={` relative flex flex-col w-full h-full `}>
      <div className="absolute z-10 top-0 right-0">
        <button
          onClick={handleSectionVisibility}
          className="cursor-pointer tooltip ">
          <p className="tooltiptext text-sm">Hide</p>X
        </button>
      </div>
      <div className="w-full h-full drop-shadow-md flex flex-row">
        <div className="w-full h-full">
          {/* heading */}
          <h1 className={`text-[#000000b3] text-[24px] font-bold  `}>
            Play and Download Videos
          </h1>
          {/* content */}
          {/* heading */}
          <div className="w-full h-full flex flex-col  relative z-10 ">
            <p className=" text-[rgba(0,0,0,0.7)] max-w-md my-3">
              Play Video From Mainstream Platforms <br />
              And download video from Facebook, <br />
              YouTube, Instagram, Twitter...
            </p>
            <div className=" flex flex-row items-center gap-4">
              <Link to="/home/iptv-player/player">
                <button
                  className={`flex items-center justify-center cursor-pointer play-now-btn px-3.5 py-1.5`}>
                  Play Now
                </button>
              </Link>
              <Link to="/home/iptv-player/library">
                <button
                  className={`flex items-center justify-center cursor-pointer download-now-btn px-3.5 py-1.5`}>
                  Download Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className=" w-full h-full relative mx-12 ">
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 50, x: -100 }}
            animate={{
              opacity: 1,
              rotate: 360,
              scale: 1.2,
              x: 0,
            }}
            transition={{ duration: 3, type: "spring" }}
            className="absolute top-10 right-6 ">
            <img src={logo1} className="w-[50px] " alt="" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 50 }}
            animate={{
              opacity: 1,
              rotate: 360,
              scale: 1.2,
              transition: { duration: 3 },
            }}
            className="absolute top-40 left-4 ">
            <img src={logo2} className="w-[50px] " alt="" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 50 }}
            animate={{
              opacity: 1,
              rotate: 360,
              scale: 1.2,
              transition: { duration: 3 },
            }}
            className="absolute top-10 left-6 ">
            <img src={logo3} className="w-[50px] " alt="" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 50 }}
            animate={{
              opacity: 1,
              rotate: 360,
              scale: 1.2,
              transition: { duration: 3 },
            }}
            className="absolute top-16 left-48 ">
            <img src={logo4} className="w-[50px] " alt="" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 50 }}
            animate={{
              opacity: 1,
              rotate: 360,
              scale: 1.2,
              transition: { duration: 3 },
            }}
            className="absolute top-32 right-64 ">
            <img src={logo5} className="w-[50px] " alt="" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 50 }}
            animate={{
              opacity: 1,
              rotate: 360,
              scale: 1.2,
              transition: { duration: 3 },
            }}
            className="absolute top-40 right-6 ">
            <img src={logo6} className="w-[50px] " alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

PlayAndDownloadVideo.propTypes = {
  handleSectionVisibility: PropTypes.func,
};
