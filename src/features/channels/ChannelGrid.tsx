import { For, Show, createEffect, createSignal } from "solid-js";
import type { Channel } from "../../lib/types";
import { appState } from "../../lib/stores";
import { ChannelCard } from "./ChannelCard";
import { EmptyState } from "../../components/ui/State";

export function ChannelGrid(props: { channels: Channel[]; emptyMessage?: string; startIndex?: number }) {
  const [expandedKey, setExpandedKey] = createSignal<string | null>(null);
  const [activePreviewKey, setActivePreviewKey] = createSignal<string | null>(null);
  const keyFor = (channel: Channel, index: number) => String(channel.url || channel.streamUrl || channel.name || index);

  createEffect(
    () => appState.videoCards(),
    (enabled) => {
      if (!enabled) setActivePreviewKey(null);
    },
  );

  return (
    <Show when={props.channels.length > 0} fallback={<EmptyState title="No channels" message={props.emptyMessage ?? "No channels found for this view."} />}>
      <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
        <For each={props.channels}>
          {(channel, index) => {
            const key = () => keyFor(channel, index());
            return (
              <ChannelCard
                channel={channel}
                number={(props.startIndex ?? 0) + index() + 1}
                expanded={expandedKey() === key()}
                preview={activePreviewKey() === key()}
                onPreview={() => setActivePreviewKey(key())}
                onToggle={() => {
                  const next = expandedKey() === key() ? null : key();
                  setExpandedKey(next);
                  if (next === null && activePreviewKey() === key()) setActivePreviewKey(null);
                }}
              />
            );
          }}
        </For>
      </div>
    </Show>
  );
}
