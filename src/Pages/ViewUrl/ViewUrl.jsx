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
    <div className="flex flex-col gap-0 mb-12">
      <div className="px-4 py-1 w-full flex flex-col lg:flex-row items-center justify-between bg-green-500 ">
        <p className="text-white text-lg ">
          <strong>Channel Name:</strong> {channelName}
        </p>
        <button
          className="flex items-center px-3 py-2 text-lg font-bold text-white rounded-lg bg-green-500 "
          onClick={() => navigate(previousPage)}>
          Go Back
        </button>
      </div>
      <div className="mt-12">
        {channelUrl && ReactPlayer.canPlay(channelUrl) ? (
          <ReactPlayer
            url={channelUrl}
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
    </div>
  );
};

export default ViewUrl;
