// testing local storage more simply :>
import { useLocalStorage } from "../../hooks/useLocalStorage";
import HlsVideoPlayer from "../../Components/hls-video-player/HlsVideoPlayer";

const TestLocalStorage = () => {
  // states
  // const [userInfoInput, setUserInfoInput] = useState(null);
  const { bookmarkedChannel } = useLocalStorage();
  const allBookmarkedChannels = Object.keys(bookmarkedChannel);

  return (
    <section className="border border-red-400 p-12 w-full min-h-screen">
      {/* hello */}
      <div></div>
      <div className="min-h-screen p-16">
        {allBookmarkedChannels?.slice(0, 1).map((channel, index) => (
          <div className="p-2" key={index}>
            <div>
              <HlsVideoPlayer src={channel} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestLocalStorage;
