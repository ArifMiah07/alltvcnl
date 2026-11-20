import { createEffect, createSignal, For, Show } from "solid-js";
import type Hls from "hls.js";
import { safeMediaUrl } from "../../lib/validation/url";
import { Icon } from "../../components/ui/Icon";

let HlsClass: typeof Hls | null = null;

async function loadHls(): Promise<typeof Hls | null> {
  if (!HlsClass) {
    const module = await import("hls.js");
    HlsClass = module.default;
  }
  return HlsClass;
}

interface LevelOption {
  index: number;
  label: string;
}

export function HlsPlayer(props: { src: string; poster?: string; title?: string; autoplay?: boolean }) {
  let video!: HTMLVideoElement;
  let instance: Hls | null = null;
  const [status, setStatus] = createSignal<"loading" | "ready" | "error">("loading");
  const [levels, setLevels] = createSignal<LevelOption[]>([]);
  const [quality, setQuality] = createSignal(-1);

  createEffect(
    () => ({ src: props.src, autoplay: props.autoplay }),
    (value) => {
      let cancelled = false;
      const src = safeMediaUrl(value.src);
      setLevels([]);
      setQuality(-1);

      const cleanup = () => {
        instance?.destroy();
        instance = null;
        if (video) {
          video.pause();
          video.removeAttribute("src");
          video.load();
        }
      };

      if (!src) {
        setStatus("error");
        return cleanup;
      }

      setStatus("loading");

      void (async () => {
        const native = video?.canPlayType("application/vnd.apple.mpegurl");
        if (native) {
          if (cancelled) return;
          video.src = src;
          setStatus("ready");
          return;
        }

        const Hls = await loadHls();
        if (cancelled || !Hls) return;
        if (!Hls.isSupported()) {
          setStatus("error");
          return;
        }

        instance = new Hls({
          maxBufferLength: 20,
          capLevelToPlayerSize: true,
          manifestLoadingMaxRetry: 2,
          levelLoadingMaxRetry: 2,
          fragLoadingMaxRetry: 2,
        });
        instance.loadSource(src);
        instance.attachMedia(video);

        instance.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
          if (cancelled) return;
          setLevels(data.levels.map((level, index) => ({ index, label: level.height ? `${level.height}p` : `Level ${index + 1}` })));
          setStatus("ready");
          if (value.autoplay) void video.play().catch(() => undefined);
        });

        instance.on(Hls.Events.ERROR, (_event, data) => {
          if (cancelled || !instance) return;
          if (!data.fatal) return;
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) instance.startLoad();
          else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) instance.recoverMediaError();
          else {
            setStatus("error");
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
    <div class="overflow-hidden rounded-sm border border-brand-purple/50 bg-black shadow-purple">
      <div class="relative aspect-video w-full">
        <video
          ref={video}
          class="h-full w-full object-contain"
          controls
          playsinline
          preload="none"
          poster={safeMediaUrl(props.poster) || undefined}
          onPlaying={() => setStatus("ready")}
          onError={() => setStatus("error")}
        />

        <Show when={status() === "loading"}>
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
            Loading stream...
          </div>
        </Show>

        <Show when={status() === "error"}>
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/85 p-6 text-center">
            <Icon name="alert" size={28} class="text-rose-400" />
            <p class="text-sm font-semibold text-white">This stream is unavailable</p>
            <Show when={safeMediaUrl(props.src)}>
              {(url) => (
                <a class="inline-flex items-center gap-2 text-sm text-fuchsia-300 underline" href={url()} target="_blank" rel="noopener noreferrer">
                  Open stream link <Icon name="external" size={14} />
                </a>
              )}
            </Show>
          </div>
        </Show>
      </div>

      <Show when={levels().length > 1}>
        <div class="flex items-center gap-3 border-t border-brand-purple/30 bg-slate-950/80 px-3 py-2 text-sm text-white/80">
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
