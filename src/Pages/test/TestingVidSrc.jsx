import HlsVideoPlayer from "./HlsVideoPlayer";

const TestingVidSrc = () => {
  return (
    <div className="p-24">
      <p>
        play:{" "}
        <a
          href="https://static.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDDEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFsaWRtaW51aiPhnPTI2/jamuna-test-sample-ok.stream/tracks-v1a1/mono.m3u8?wmsAuthSign="
          target="_blank">
          click
        </a>
      </p>
      <HlsVideoPlayer
        src={
          "https://static.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDDEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFsaWRtaW51aiPhnPTI2/jamuna-test-sample-ok.stream/tracks-v1a1/mono.m3u8?wmsAuthSign="
        }
        controls
        autoPlay={false}
      />
    </div>
  );
};

export default TestingVidSrc;
