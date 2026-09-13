import HlsVideoPlayer from "../hls-video-player/HlsVideoPlayer";
import Navbar from "./Navbar";

const StreamDisplay = () => {
  //

  //

  //

  return (
    //
    //
    //
    <div className=" main-bg w-full h-full border border-dashed border-white">
      <Navbar />
      <main className="w-full min-h-[calc(100vh-40px)] grid grid-cols-12 grid-rows-12 gap-1">
        <div className=" flex flex-row items-center justify-center col-span-12 row-span-1 broder border-red-500 bg-[#d9d9d91a] gap-4">
          1
        </div>
        <div className=" flex flex-row items-center justify-center col-span-1 row-span-11 broder border-red-500 bg-[#d9d9d91a] gap-4">
          2
        </div>
        {/* 3  --  stream player and controlls  */}
        <div className=" col-span-7 row-span-11 broder border-red-500 bg-[#d9d9d91a] gap-4">
          <div className="grid grid-cols-12 grid-rows-12 border-2 border-green-500 ">
            <div className="w-full h-full col-span-12 row-span-8 flex flex-row ">
              <div className="w-full h-full flex flex-col border border-green-50">
                <HlsVideoPlayer
                  src={
                    "https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/e4523706-f2a8-4b0f-b081-40fe59a46f81/manifest.m3u8"
                  }
                  status={true}
                  controls
                  autoPlay={false}
                />
              </div>
            </div>
            <div className="w-full h-full col-span-12 row-span-8 flex flex-row ">
              32
            </div>
            <div className="w-full h-full col-span-12 row-span-8 flex flex-row ">
              33
            </div>
            <div className="w-full h-full col-span-12 row-span-8 flex flex-row ">
              34
            </div>
          </div>
          3
        </div>
        <div className=" flex flex-row items-center justify-center col-span-1 row-span-11 broder border-red-500 bg-[#d9d9d91a] gap-4">
          4
        </div>
        <div className=" flex flex-row items-center justify-center col-span-3 row-span-11 broder border-red-500 bg-[#d9d9d91a] gap-4">
          5
        </div>
        <div className=" flex flex-row items-center justify-center col-span-12 row-span-1 broder border-red-500 bg-[#d9d9d91a] gap-4">
          6
        </div>
      </main>
    </div>
  );
};

export default StreamDisplay;
