import HlsVideoPlayer from "../Components/hls-video-player/HlsVideoPlayer";

const VideoPlayer = () => {
  return (
    <div className="w-80">
      <h1>Live Video</h1>
      <HlsVideoPlayer
        // url="https://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/playlist.m3u8"
        url="chrome-extension://eakdijdofmnclopcffkkgmndadhbjgka/player.html#https://live-fi.tvkaista.net/national-geographic/live.m3u8"
        controls
        width="100%"
        height="auto"
      />
      <HlsVideoPlayer
        url="https://us170.jagobd.com:447/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/rtv-sg.stream/playlist.m3u8"
        // url="chrome-extension://eakdijdofmnclopcffkkgmndadhbjgka/player.html#https://live-fi.tvkaista.net/national-geographic/live.m3u8"
        controls
        width="100%"
        height="auto"
      />
      <HlsVideoPlayer
        url="https://ythls.armelin.one/channel/UC__baaN73Zp5Hn0N_d4BTdg.m3u8"
        // url="chrome-extension://eakdijdofmnclopcffkkgmndadhbjgka/player.html#https://live-fi.tvkaista.net/national-geographic/live.m3u8"
        controls
        width="100%"
        height="auto"
      />
      <HlsVideoPlayer
        url="https://us170.jagobd.com:447/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/somoyt000011226615544544.stream/playlist.m3u8"
        // url="chrome-extension://eakdijdofmnclopcffkkgmndadhbjgka/player.html#https://live-fi.tvkaista.net/national-geographic/live.m3u8"
        controls
        width="100%"
        height="auto"
      />
      <HlsVideoPlayer
        url="https://canal.mediaserver.com.co/live/buenisimatv.m3u8"
        // url="chrome-extension://eakdijdofmnclopcffkkgmndadhbjgka/player.html#https://live-fi.tvkaista.net/national-geographic/live.m3u8"
        controls
        width="100%"
        height="auto"
      />
      <HlsVideoPlayer
        url="https://us170.jagobd.com:447/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/somoyt000011226615544544.stream/playlist.m3u8"
        // url="chrome-extension://eakdijdofmnclopcffkkgmndadhbjgka/player.html#https://live-fi.tvkaista.net/national-geographic/live.m3u8"
        controls
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default VideoPlayer;
