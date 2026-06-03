// import { useEffect, useState } from "react";
import channelsData from "../../../public/jsons/collected_channels_01.json";
import HlsVideoPlayer from "../../Components/hls-video-player/HlsVideoPlayer";

const TestingCollectedChannels = () => {
  console.log(channelsData?.length);

  return (
    <div className="p-12 grid grid-cols-3 gap-5 ">
      {channelsData?.slice(0, 9).map((channel, index) => (
        <div key={index}>
          <div className="flex flex-col">
            <h1 className="text-black text-lg">{channel.name}</h1>
            <p className="text-black text-md space-y-3">{channel.group}</p>
          </div>
          <div>
            <img
              className="w-24 h-24"
              src={channel.logo}
              alt={`${channel.name} logo`}
            />
          </div>
          <div className="border p-2">
            <HlsVideoPlayer src={channel.url} controls autoPlay={false} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestingCollectedChannels;
