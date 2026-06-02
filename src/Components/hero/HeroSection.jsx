// import { useState } from "react";
import hero_img_Action_Hollywood_Movies from "../../assets/images/hero/hero-img-Action-Hollywood-Movies.png";
// import hero_img_mr_bean_01 from "../../assets/images/hero/hero-img-mr-bean-0.png";
import hero_img_mr_bean_02 from "../../assets/images/hero/hero-img-mr-bean-01.png";

// import HlsVideoPlayer from "../../Components/hls-video-player/HlsVideoPlayer";

const slide = {
  id: 1,
  imageUrl: hero_img_Action_Hollywood_Movies,
  title: "Action Hollywood Movies",
  description: "watch hollywood movies form decades old archive",
  category: "",
  streamUrl:
    "https://amg01076-lightningintern-actionhollywood-samsungau-rs69y.amagi.tv/playlist/amg01076-lightningintern-actionhollywood-samsungau/playlist.m3u8",
};
const slide2 = {
  id: 1,
  imageUrl: hero_img_mr_bean_02,
  title: "Mr. Bean Anime Italy",
  description: "watch Mr. Bean Anime Italy form decades old archive",
  category: "2d animation",
  streamUrl:
    "https://amg00627-amg00627c29-rakuten-it-3989.playouts.now.amagi.tv/playlist/amg00627-banijayfast-mrbeanitcc-rakutenit/playlist.m3u8",
};

export default function HeroSection() {
  //   const [isStreamPlaying, setIsStreamPlaying] = useState(false);
  //   const [isHovered, setIsHovered] = useState(false);

  //   const handleStreamOnOff = () => {
  //     setIsStreamPlaying(!isStreamPlaying);
  //   };
  return (
    <>
      {/* {isStreamPlaying ? (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className=" relative w-full h-full">
          {isHovered ? (
            <div
              onClick={handleStreamOnOff}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white shadow-xl transition-transform hover:scale-110 cursor-pointer">
              <div
                className="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 
                w-0 h-0 
                border-t-[15px] border-t-transparent 
                border-l-[25px] border-l-white 
                border-b-[15px] border-b-transparent"></div>
            </div>
          ) : (
            "Hover over me"
          )}
          <HlsVideoPlayer src={slide2?.streamUrl} controls autoPlay={false} />
        </div>
      ) : ( */}
      <section
        className="relative w-full h-[95vh] bg-cover bg-center flex items-center px-6 lg:px-12"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${slide2.imageUrl})`,
        }}>
        {/* <div className="w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6   ">
          <div
            onClick={handleStreamOnOff}
            className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white shadow-xl transition-transform hover:scale-110 cursor-pointer">
            <div
              className="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 
                w-0 h-0 
                border-t-[15px] border-t-transparent 
                border-l-[25px] border-l-white 
                border-b-[15px] border-b-transparent"></div>
          </div>
        </div> */}
        <div className="max-w-xl space-y-4">
          <h1 className="text-4xl font-bold text-white">{slide2.title}</h1>
          <p className="text-gray-300">{slide2.description}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Watch Now
          </button>
        </div>
      </section>
      {/* )} */}
    </>
  );
}

{
  /* <h1 className="dark:text-white text-black">this is hero section</h1> */
}
{
  /* <img
  src={hero_img_Action_Hollywood_Movies}
  alt="hero_img_Action_Hollywood_Movies"
  className="w-full h-full bg-cover"
/> */
}
