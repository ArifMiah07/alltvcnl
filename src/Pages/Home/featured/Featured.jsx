import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "motion/react";
import WatchLiveStreams from "../../../Components/featured/WatchLiveStreams";
import PlayAndDownloadVideo from "../../../Components/featured/PlayAndDownloadVideo";
import GetOurApp from "../../../Components/featured/GetOurApp";

export default function FeaturedPage() {
  const [showWelcome, setShowWelcome] = useState(true);

  const [sections, setSections] = useState({
    live: false,
    download: false,
    getApp: false,
  });

  //
  // generic toggle handler
  const toggleSection = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // config array
  const featuresSections = [
    {
      key: "live",
      title: "Watch Live Streams",
      components: WatchLiveStreams,
    },
    {
      key: "download",
      title: "Play and Download Videos",
      components: PlayAndDownloadVideo,
    },
    {
      key: "getApp",
      title: "Get Our App",
      components: GetOurApp,
    },
  ];

  // Hide the welcome message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full h-full flex flex-col gap-2.5  ">
      {/* welcome message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[54px] bg-[#D9D9D933] p-5 backdrop-blur-xs flex ">
            <h1 className="text-[#000000B3] text-[16px] font-semibold">
              Welcome To IPTV Player
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
      {/* features */}
      {/* dynamic features */}
      {/* show all sections */}
      {featuresSections?.map(({ key, title, components: Feature }) => (
        <div key={key}>
          {!sections[key] ? (
            <div className="w-full h-[300px] border border-[#A100FF] shadow-sm hover:drop-shadow-sm bg-[#D9D9D933] p-5 backdrop-blur-xs">
              <Feature handleSectionVisibility={() => toggleSection(key)} />
            </div>
          ) : (
            <div className="w-full h-[30px] bg-[#D9D9D933] border border-[#A100FF] shadow-sm hover:drop-shadow-sm flex items-center p-5 backdrop-blur-xs">
              <button
                className="cursor-pointer"
                onClick={() => toggleSection(key)}>
                <span className="tooltip">
                  <p className="tooltiptext text-sm">Show Complete Section</p>
                  {title}
                </span>
              </button>
            </div>
          )}
        </div>
      ))}

      {/* <div className="w-full h-[300px]   bg-[#D9D9D933] p-5 backdrop-blur-xs ">
        <PlayAndDownloadVideo></PlayAndDownloadVideo>{" "}
      </div> */}
    </section>
  );
}
