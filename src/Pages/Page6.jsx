import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Pagination from "./Pagination";

const Page6 = () => {
  const [cnlData, setCnlData] = useState([]);

  useEffect(() => {
    fetch("page6.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setCnlData(data);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-green-500 flex flex-co lg:flex-row items-center justify-end gap-5 text-center">
        <h1 className="text-lg px-3 py-2 capitalize text-white font-semibold">
          Page {6}
        </h1>
        <p className="text-lg px-3 py-2 capitalize text-white font-semibold">
          Total Channel: {cnlData.length}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center text-black gap-5 mt-4">
        <Pagination />
        <div className="flex gap-4 items-center">
          <button className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
            <Link to="/page5">Previous</Link>
          </button>
          <button className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
            <Link to="/page7">Next</Link>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mt-4">
        {cnlData.map((cnl) => (
          <div key={cnl.id} className="w-80">
            <div className="border border-gray-700 p-2">
              <div className="flex justify-center">
                <p className="text-lg font-bold">{cnl.name}</p>
              </div>
              {cnl.url && (
                <ReactPlayer
                  url={cnl.url}
                  controls
                  width="100%"
                  height="auto"
                  className="mt-2"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-col lg:flex-row items-center justify-center text-black gap-5 mt-4">
        <Pagination />
        <div className="flex gap-4 items-center">
          <button className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
            <Link to="/page5">Previous</Link>
          </button>
          <button className="btn text-black hover:text-white w-fit bg-green-50 py-3 px-5">
            <Link to="/page7">Next</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page6;
