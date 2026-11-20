import { createEffect, createSignal, For, Show } from "solid-js";
import type Hls from "hls.js";
import { safeHref, safeMediaUrl } from "../../lib/validation/url";

let HlsClass: typeof Hls | null = null;

async function loadHls(): Promise<typeof Hls | null> {
  if (!HlsClass) {
    const module = await import("hls.js/light");
    HlsClass = module.default;
  }
  return HlsClass;
}

export function preloadHls(): void {
  void loadHls();
}

interface LevelOption {
  index: number;
  label: string;
}

type StreamStatus = "green" | "purple" | "blue";

export function HlsPlayer(props: { src: string; poster?: string; title?: string; autoplay?: boolean }) {
  let video!: HTMLVideoElement;
  let instance: Hls | null = null;
  const [status, setStatus] = createSignal<StreamStatus>("green");
  const [levels, setLevels] = createSignal<LevelOption[]>([]);
  const [quality, setQuality] = createSignal(-1);

  const borderClass = () => {
    if (status() === "purple") return "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]";
    if (status() === "blue") return "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]";
    return "border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]";
  };

  createEffect(
    () => ({ src: props.src, autoplay: props.autoplay }),
    (value) => {
      let cancelled = false;
      let watchdog: number | undefined;
      let networkRetries = 0;
      const src = safeMediaUrl(value.src);
      setLevels([]);
      setQuality(-1);

      const clearWatchdog = () => {
        if (watchdog === undefined) return;
        window.clearTimeout(watchdog);
        watchdog = undefined;
      };

      const cleanup = () => {
        clearWatchdog();
        instance?.destroy();
        instance = null;
        if (video) {
          video.pause();
          video.removeAttribute("src");
          video.load();
        }
      };

      if (!src) {
        setStatus("blue");
        return cleanup;
      }

      setStatus("green");
      watchdog = window.setTimeout(() => {
        if (!cancelled && status() === "green" && video.readyState < 3) setStatus("blue");
      }, 15000);

      void (async () => {
        const native = video?.canPlayType("application/vnd.apple.mpegurl");
        if (native) {
          if (cancelled) return;
          video.src = src;
          clearWatchdog();
          setStatus("purple");
          return;
        }

        const Hls = await loadHls();
        if (cancelled || !Hls) return;
        if (!Hls.isSupported()) {
          clearWatchdog();
          setStatus("blue");
          return;
        }

        instance = new Hls({
          maxBufferLength: 15,
          capLevelToPlayerSize: true,
          autoStartLoad: true,
          manifestLoadingMaxRetry: 3,
          levelLoadingMaxRetry: 2,
          fragLoadingMaxRetry: 2,
        });
        instance.loadSource(src);
        instance.attachMedia(video);

        instance.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
          if (cancelled) return;
          clearWatchdog();
          setLevels(data.levels.map((level, index) => ({ index, label: level.height ? `${level.height}p` : `Level ${index + 1}` })));
          setStatus("purple");
          if (value.autoplay) void video.play().catch(() => undefined);
        });

        instance.on(Hls.Events.ERROR, (_event, data) => {
          if (cancelled || !instance || !data.fatal) return;
          clearWatchdog();
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR && networkRetries < 1) {
            networkRetries += 1;
            instance.startLoad();
          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            instance.recoverMediaError();
          } else {
            setStatus("blue");
            instance.destroy();
            instance = null;
          }
        });
      })();

      return () => {
        cancelled = true;
        cleanup();
      };
    },
  );

  createEffect(
    () => quality(),
    (value) => {
      if (instance) instance.currentLevel = value;
    },
  );

  return (
    <div class={`overflow-hidden rounded-sm border bg-black ${borderClass()}`}>
      <div class="relative aspect-video w-full">
        <video
          ref={video}
          class="h-full w-full object-cover"
          controls
          playsinline
          poster={safeHref(props.poster) || undefined}
          onPlaying={() => setStatus("purple")}
          onError={() => setStatus("blue")}
        />

        <Show when={status() === "green"}>
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-semibold text-white">
            Loading stream...
          </div>
        </Show>

        <Show when={status() === "blue"}>
          <div class="absolute right-2 top-2 flex flex-col items-end gap-1">
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

      <Show when={levels().length > 1}>
        <div class="flex items-center gap-3 border-t border-white/15 bg-slate-950/80 px-3 py-2 text-sm text-white/80">
          <label for="stream-quality">Quality</label>
          <select
            id="stream-quality"
            class="rounded-sm border border-white/15 bg-slate-900 px-2 py-1 text-sm text-white"
            value={quality()}
            onChange={(event) => setQuality(Number(event.currentTarget.value))}>
            <option value={-1}>Auto</option>
            <For each={levels()}>
              {(level) => <option value={level.index}>{level.label}</option>}
            </For>
          </select>
          <span class="ml-auto truncate text-xs text-white/50">{props.title}</span>
        </div>
      </Show>
    </div>
  );
}
