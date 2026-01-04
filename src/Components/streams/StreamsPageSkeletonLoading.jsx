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
              <div className="px-2">{item}</div>
              <div>{item}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className=""></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StreamsPageSkeletonLoading;
