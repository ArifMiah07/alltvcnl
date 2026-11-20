import { createEffect, createSignal, type Accessor } from "solid-js";

export interface ResourceState<T> {
  loading: boolean;
  error: string;
  data: T | null;
}

export function createResource<T, D>(fetcher: (signal: AbortSignal, deps: D) => Promise<T>, deps: Accessor<D>): Accessor<ResourceState<T>> {
  const [state, setState] = createSignal<ResourceState<T>>({ loading: true, error: "", data: null });
  let controller: AbortController | undefined;

  createEffect(
    () => deps(),
    (value) => {
      controller?.abort();
      controller = new AbortController();
      const active = controller;
      setState({ loading: true, error: "", data: null });

      void fetcher(active.signal, value)
        .then((data) => {
          if (active === controller) setState({ loading: false, error: "", data });
        })
        .catch((error: unknown) => {
          if (active !== controller) return;
          if (error instanceof DOMException && error.name === "AbortError") return;
          setState({
            loading: false,
            error: error instanceof Error ? error.message : "Unable to load data",
            data: null,
          });
        });

      return () => active.abort();
    },
  );

  return state;
}
