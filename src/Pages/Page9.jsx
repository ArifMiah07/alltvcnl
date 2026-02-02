import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import HlsVideoPlayer from "../Components/hls-video-player/HlsVideoPlayer";

const Page9 = () => {
  const [cnlData, setCnlData] = useState([]);

  useEffect(() => {
    fetch("page9.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setCnlData(data);
      });
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="bg-green-500 flex flex-co lg:flex-row items-center justify-end gap-5 text-center">
        <h1 className="text-lg px-3 py-2 capitalize text-white font-semibold">
          Page {9}
        </h1>
        <p className="text-lg px-3 py-2 capitalize text-white font-semibold">
          Total Channel: {cnlData.length}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center text-black gap-5 mt-4">
        <Pagination />
        <div className="flex gap-4 items-center">
          <button className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
            <Link to="/page8">Previous</Link>
          </button>
          <button className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
            <Link to="/page10">Next</Link>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mt-4">
        {cnlData.map((cnl) => (
          <div key={cnl.id} className="w-80  border border-gray-700 p-2 m-4">
            <div className="bg-purple-50  ">
              <div className="flex justify-center">
                <p className="text-lg font-bold">{cnl.title}</p>
              </div>
              <HlsVideoPlayer
                src={cnl.url}
                controls={true}
                width="100%"
                height="auto"
                className="mt-2"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-col lg:flex-row items-center justify-center text-black gap-5 mt-4">
        <Pagination />
        <div className="flex gap-4 items-center">
          <button className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
            <Link to="/page8">Previous</Link>
          </button>
          <button className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
            <Link to="/page10">Next</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page9;
