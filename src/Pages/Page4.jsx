import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Pagination from "./Pagination";

const Page4 = () => {
  const [cnlData, setCnlData] = useState([]);

  useEffect(() => {
    fetch("page4.json") // Assuming you have a JSON file with data for Page4
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCnlData(data);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <h1 className="text-xl font-bold">This is Page 4</h1>
        <p className="text-lg font-semibold">Total Channel: {cnlData.length}</p>
      </div>
      <Pagination />
      <div className="flex flex-wrap justify-center gap-5 mt-4">
        {cnlData.map((cnl) => (
          <div key={cnl.id} className="w-80">
            <div className="border border-gray-700 p-2">
              <div className="flex justify-center">
                {cnl.logo && <img src={cnl.logo} alt={cnl.name} className="h-16 w-16 mr-2" />}
                <p className="text-lg font-bold">{cnl.name}</p>
              </div>
              {Array.isArray(cnl.url) ? (
                <ReactPlayer url={cnl.url[0]} controls width="100%" height="auto" className="mt-2" />
              ) : (
                <p className="mt-2">No video URL available</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination />
      <div className="flex flex-row gap-5 mt-4">
        <p className="btn w-fit bg-green-50 py-3 px-5">
          <Link to="/">Back</Link>
        </p>
        <p className="btn w-fit bg-green-50 py-3 px-5">
          <Link to="/page5">Next</Link>
        </p>
      </div>
    </div>
  );
};

export default Page4;
