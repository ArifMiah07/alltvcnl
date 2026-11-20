import { For, Show, createSignal } from "solid-js";
import type { Channel } from "../../lib/types";
import { ChannelCard } from "./ChannelCard";
import { EmptyState } from "../../components/ui/State";

export function ChannelGrid(props: { channels: Channel[]; emptyMessage?: string; startIndex?: number }) {
  const [expandedKey, setExpandedKey] = createSignal<string | null>(null);
  const keyFor = (channel: Channel, index: number) => String(channel.url || channel.streamUrl || channel.name || index);

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
                onToggle={() => setExpandedKey(expandedKey() === key() ? null : key())}
              />
            );
          }}
        </For>
      </div>
    </Show>
  );
}
