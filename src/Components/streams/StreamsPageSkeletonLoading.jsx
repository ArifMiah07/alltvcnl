import { motion } from "motion/react";

const StreamsPageSkeletonLoading = () => {
  //
  const items = Array.from({ length: 10 }, (_, i) => i++);
  //   console.log("Arr:", items);

  //
  return (
    <motion.div className="p-4">
      <motion.h1
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "none" }}
        className="flex flex-row items-start animate-pulse justify-start text-purple-500 text-lg mb-6 w-[300px] h-[32px] bg-white/30 border border-gray-200 ">
        {/* Iptv player {">"} Streaming */}
      </motion.h1>
      {/* <h1>This is Loading skeleton</h1>
      <p>loading...</p> */}
      <motion.div className="flex gap-4">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {items?.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "none" }}
              className="flex flex-row items-start animate-pulse justify-start text-purple-500 text-lg mb-6 lg:w-[390px] lg:h-[332px] bg-white/30 border border-gray-200 "
              key={index}>
              {/* <div className="px-2">{item}</div>
              <div>{item}</div> */}
              {""}
            </motion.div>
          ))}
        </motion.div>
        <motion.div className=""></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StreamsPageSkeletonLoading;

/** ____TODO____
 *
 * Make a frame on all elements
 * Add animation
 * Make and Check responsiveness
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// https://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/stitch/hls/channel/65d5fc39a25d5e00082895c4livestitch/master.m3u8?appName=web&appVersion=unknown&clientTime=0&deviceDNT=0&deviceId=bc8504f0-4b91-11ef-8a44-83c5e90e038f&deviceMake=Chrome&deviceModel=web&deviceType=web&deviceVersion=unknown&includeExtendedEvents=false&serverSideAds=false&sid=a11b7b48-853c-4292-b5d5-30482134cf1e&profilesFromStream=true
