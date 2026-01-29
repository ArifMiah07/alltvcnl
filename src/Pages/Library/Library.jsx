import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Library() {
  return (
    <div className="w-full min-h-screen flex flex-col p-4 items-start justify-start ">
      <Helmet>
        <title>Iptv library...</title>
        <meta
          name="description"
          content="Learn more about our IPTV Player and the team behind the experience."
        />
      </Helmet>
      {/* <h1 className="text-xl">Library page</h1>
      <p className="text-lg">Coming Soon...</p> */}
      <div className="flex flex-col lg:flex-row items-start justify-start flex-wrap gap-4">
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">
            Stream World Wide IPTV
          </p>
          <Link to={`/streams`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">Stream Asian IPTV</p>
          <Link to={`/stream/asian-iptv`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
        {/* <Features></Features> */}
        {/* just wasted time by using *** AI */}
        {/* <div className="min-w-[300px] w-fit h-fit p-4 bg-pink-300  ">
          <p className="text-lg font-medium text-black  ">
            view streams from iptv index
          </p>
          <Link to={`/ip`}>
            <p className="underline text-blue-800">watch</p>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
