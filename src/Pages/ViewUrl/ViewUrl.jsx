import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";

const ViewUrl = () => {
  //   const { url } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const channelName = location.state?.channelName || "Unknown";
  const channelUrl = location.state?.channelUrl || "Unknown";
  //   const channelId = location.state?.channelId || "N/A";
  const previousPage = location.state?.from || "/home";

  return (
    <div className=" w-full  flex flex-col gap-0 mb-12">
      {/* nav */}
      <nav className="px-4 py-1 w-full flex flex-col lg:flex-row items-center justify-between bg-green-500 ">
        <p className="text-white text-lg ">
          <strong>Channel Name:</strong> {channelName}
        </p>
        <button
          className="flex items-center px-3 py-2 text-lg font-bold text-white rounded-lg bg-green-500 "
          onClick={() => navigate(previousPage)}>
          Go Back
        </button>
      </nav>
      {/* content section */}
      <section className="mt-12 w-full h-full ">
        <div className=" w-full h-full  p-24">
          {channelUrl && ReactPlayer.canPlay(channelUrl) ? (
            <ReactPlayer
              src={channelUrl}
              controls={true}
              width="100%"
              height="auto"
            />
          ) : (
            <div className="text-center text-gray-400 py-6">
              Stream not available
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewUrl;
