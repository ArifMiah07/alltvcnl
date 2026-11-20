import { createEffect, createSignal, Show } from "solid-js";
import Hls from "hls.js";
import { safeMediaUrl } from "../../lib/validation/url";

type StreamStatus = "green" | "purple" | "blue";

export function HlsPlayer(props: { src: string; status?: boolean; autoplay?: boolean }) {
  let video!: HTMLVideoElement;
  let instance: Hls | null = null;
  const [streamStatus, setStreamStatus] = createSignal<StreamStatus>("green");

  const borderClass = () => {
    if (streamStatus() === "purple") return "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]";
    if (streamStatus() === "blue") return "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]";
    return "border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]";
  };

  createEffect(
    () => ({ src: props.src, status: props.status, autoplay: props.autoplay }),
    (value) => {
      let cancelled = false;
      let watchdog: number | undefined;
      const src = safeMediaUrl(value.src);

      const clearWatchdog = () => {
        if (watchdog === undefined) return;
        window.clearTimeout(watchdog);
        watchdog = undefined;
      };

      const cleanup = () => {
        cancelled = true;
        clearWatchdog();
        instance?.destroy();
        instance = null;
        if (video) {
          video.pause();
          video.removeAttribute("src");
          video.load();
        }
      };

      setStreamStatus(value.status ? "purple" : "green");

      if (!src) {
        setStreamStatus("blue");
        return cleanup;
      }

      watchdog = window.setTimeout(() => {
        if (!cancelled && !video.autoplay && video.readyState < 3) {
          setStreamStatus((current) => (current === "purple" ? current : "blue"));
        }
      }, 15000);

      if (Hls.isSupported()) {
        instance = new Hls({
          maxBufferLength: 15,
          capLevelToPlayerSize: true,
          autoStartLoad: true,
          manifestLoadingMaxRetry: 5,
        });
        instance.loadSource(src);
        instance.attachMedia(video);

        instance.on(Hls.Events.MANIFEST_PARSED, () => {
          if (cancelled) return;
          clearWatchdog();
          setStreamStatus("purple");
          if (value.autoplay) void video.play().catch(() => undefined);
        });

        instance.on(Hls.Events.ERROR, (_event, data) => {
          if (cancelled || !data.fatal) return;
          clearWatchdog();
          setStreamStatus("blue");
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        clearWatchdog();
        if (value.autoplay) void video.play().catch(() => undefined);
      } else {
        clearWatchdog();
        setStreamStatus("blue");
      }

      return cleanup;
    },
  );

  return (
    <div class={`relative min-h-[150px] w-full overflow-hidden rounded-sm border bg-black ${borderClass()}`} style={{ "aspect-ratio": "16 / 9" }}>
      <video
        ref={video}
        class="h-full w-full object-cover"
        controls
        autoplay={props.autoplay}
        playsinline
        onPlaying={() => setStreamStatus("purple")}
        onError={() => setStreamStatus("blue")}
      />

      <Show when={streamStatus() === "blue"}>
        <div class="absolute right-2 top-2 z-20 flex flex-col items-end gap-1">
          <span class="rounded bg-blue-600/90 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Unreachable</span>
          <Show when={safeMediaUrl(props.src)}>
            {(url) => (
              <a
                class="rounded bg-white px-3 py-1 text-[10px] font-black uppercase text-blue-700 shadow hover:bg-gray-100"
                href={url()}
                target="_blank"
                rel="noopener noreferrer">
                Open Stream Link
              </a>
            )}
          </Show>
        </div>
      </Show>
    </div>
  );
}
