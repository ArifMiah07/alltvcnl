import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import ReactPlayer from "react-player";

const Page10 = () => {
  const [cnlData, setCnlData] = useState([]);

  useEffect(() => {
    fetch("page10.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCnlData(data);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-green-500 flex flex-co lg:flex-row items-center justify-end gap-5 text-center">
        <h1 className="text-lg px-3 py-2 capitalize text-white font-semibold">
          Page {10}
        </h1>
        <p className="text-lg px-3 py-2 capitalize text-white font-semibold">
          Total Channel: {cnlData.length}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center text-black gap-5 mt-4">
        <Pagination />
        <p className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
          <Link to="/">Back</Link>
        </p>
        <p className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
          <Link to="/page2">Next</Link>
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mt-4">
        {cnlData.map((cnl) => (
          <div key={cnl.id} className="w-80 border border-gray-700 p-2 m-4">
            <div className="bg-purple-50 ">
              <div className="flex justify-center">
                {/* <img
                  src={cnl["tvg-logo"]}
                  alt={cnl.title}
                  className="h-16 w-16 mr-2"
                /> */}
                <p className="text-lg font-bold">{cnl.title}</p>
              </div>
              <div className="mt-2">
                <ReactPlayer
                  url={cnl.url}
                  controls={true}
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-col lg:flex-row items-center justify-center text-black gap-5 mt-4">
        <Pagination />
        <p className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
          <Link to="/">Back</Link>
        </p>
        <p className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
          <Link to="/page2">Next</Link>
        </p>
      </div>
    </div>
  );
};

export default Page10;
