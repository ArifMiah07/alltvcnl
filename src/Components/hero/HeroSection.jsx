// import { useState } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import slides from "../../data/slidesData.json";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeSlide = slides[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!activeSlide) return null;

  return (
    <section
      className="relative w-full h-[95vh] bg-cover bg-center flex items-center px-6 lg:px-12 transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${activeSlide.imageUrl})`,
      }}>
      <div className="max-w-xl flex flex-col gap-4">
        {activeSlide.category && (
          <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">
            {activeSlide.category}
          </span>
        )}
        <h1 className="text-4xl lg:text-5xl font-bold text-white transition-all">
          {activeSlide.title}
        </h1>
        <p className="text-gray-300 text-lg">{activeSlide.description}</p>

        <Link
          to={`/specific-channel/${currentIndex}/${encodeURIComponent(activeSlide.title)}`}
          state={{ streamData: activeSlide }}
          className="w-fit">
          <button className="bg-green-600 hover:bg-green-700 transition-colors text-white px-8 py-3 rounded font-medium shadow-lg">
            Watch Now
          </button>
        </Link>
      </div>

      {/* Slider Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-green-500" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
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

{
  /* <div className="w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6   ">
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
        </div> */
}
{
  /* {isStreamPlaying ? (
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
      ) : ( */
}
//   const [isStreamPlaying, setIsStreamPlaying] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleStreamOnOff = () => {
//     setIsStreamPlaying(!isStreamPlaying);
//   };
