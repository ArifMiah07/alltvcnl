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
      <div className="flex flex-col lg:flex-row items-start justify-start flex-wrap gap-4">
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">
            Stream World Wide IPTV
          </p>
          <Link to={`/stream-iptv`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">Stream Asian IPTV</p>
          <Link to={`/stream/asian-iptv`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
        {/* stream/china-iptv */}
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">Stream China IPTV</p>
          <Link to={`/stream/china-iptv`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
        <div className="min-w-[300px] w-fit h-fit p-4 border border-blue-500 bg-green-500   ">
          <p className="text-lg font-medium text-white  ">Watch IPTV</p>
          <Link to={`/iptv`}>
            <p className="underline text-black">watch</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
