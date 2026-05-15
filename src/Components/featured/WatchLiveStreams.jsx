// import { NavMenuButton } from "../buttons/CustomButtons";
import image1 from "../../assets/black-white-tv.png";
import image2 from "../../assets/wild-life-nature.jpg";
import logo1 from "../../assets/universal_monsters_01.jpg";
import logo2 from "../../assets/BBC_Earth_.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function WatchLiveStreams({ handleSectionVisibility }) {
  return (
    // TODO: make it responsive for other devices
    <section
      className={` relative flex flex-col w-full h-full drop-shadow-md `}>
      {/* visibility state */}
      <div className="absolute top-0 right-0">
        <button
          onClick={handleSectionVisibility}
          className="cursor-pointer tooltip ">
          <p className="tooltiptext text-sm">Hide</p>
          <span className="dark:text-white"> X</span>
        </button>
      </div>
      {/* heading */}
      <h1
        className={`text-[#000000b3] dark:text-white mb-3 text-[24px] font-bold  `}>
        Watch Live Streams
      </h1>
      {/* content */}
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between gap-6 ">
        {/* showcase */}
        <div className="   my-4 w-full h-full flex flex-row  ">
          {/* <div>
            <NavMenuButton
              label={"Lunch IPTV Now"}
              styles={"link-btn nav-link-btn "}></NavMenuButton>
          </div> */}
          <div className=" relative w-full p-5 ">
            {/* image 1 - black and white tv channels */}
            <div className="relative ">
              {/* show this as a tiny black filter */}
              <div className="w-[300px] h-[140px] absolute bg-[rgba(0,0,0,0.3)]">
                {/* black filter */}
              </div>
              <img
                src={image1}
                className="w-[300px] h-[140px] object-cover shadow-[12px_12px_4px_rgba(161,0,255,1)] "
                alt="black and white tv channel"
              />
              {/* logo of a channel */}
              <div className="absolute top-0 left-0 ">
                <img src={logo1} className="w-12 h-6" alt="channel" />
              </div>
            </div>
            {/* image 2 - wild nature channel */}
            <div className="absolute top-12 -right-56 w-full pointer-events-none z-0">
              {/* wild nature image */}
              <div className="relative">
                {/* show this as a tiny black filter */}
                <div className="w-[300px] h-[140px] absolute bg-[rgba(255,255,255,0.1)]">
                  {/* black filter */}
                </div>
                <img
                  src={image2}
                  className="w-[300px] h-[140px] object-cover shadow-[12px_12px_4px_rgba(255,0,255,1)] "
                  alt="black and white tv channel"
                />
                {/* wild nature logo */}
                <div className="absolute top-0 left-0  ">
                  <img src={logo2} className="w-12 h-6  " alt="channel" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* heading */}
        <div className="w-full lg:w-[70%]  h-full flex flex-col items-start justify-center relative z-10 ">
          <h1 className=" text-3xl dark:text-white font-bold ">
            Stream 13,000+ Live <br />
            Channels Instantly
          </h1>
          <p className=" text-[rgba(0,0,0,0.7)] dark:text-white max-w-md my-3">
            Access sports, movies, news, and <br /> entertainment channels
            worldwide — <br />
            all in one seamless platform.
          </p>
          <div className="  w-full lg:w-[70%] h-fit flex flex-row  gap-4">
            <Link to="/stream-iptv">
              <button
                className={`flex items-center justify-center cursor-pointer watch-now-btn px-3.5 py-1.5`}>
                Watch Now
              </button>
            </Link>
            <Link to="/about">
              <button
                className={`flex items-center justify-center cursor-pointer learn-more-btn px-3.5 py-1.5`}>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

WatchLiveStreams.propTypes = {
  handleSectionVisibility: PropTypes.func,
};
