import { lazy } from "solid-js";
import { browserHistory, createRouter, defineRoutes, hashHistory } from "@solidjs/router";
import { AppLayout } from "../components/layout/AppLayout";
import { IS_ELECTRON } from "../lib/api/config";
import LandingPage from "./LandingPage";
import Home from "./Home";
import Streams from "./Streams";

const Verified = lazy(() => import("./Verified"));
const Search = lazy(() => import("./Search"));
const China = lazy(() => import("./China"));
const Collected = lazy(() => import("./Collected"));
const Favorites = lazy(() => import("./Favorites"));
const Playlists = lazy(() => import("./Playlists"));
const PlaylistPlayer = lazy(() => import("./PlaylistPlayer"));
const Watch = lazy(() => import("./Watch"));
const About = lazy(() => import("./About"));
const NotFound = lazy(() => import("./NotFound"));

const routes = defineRoutes([
  {
    path: "/",
    component: AppLayout,
    children: [
      { path: "/", component: LandingPage },
      { path: "/home", component: Home },
      { path: "/streams", component: Streams },
      { path: "/stream-iptv", component: Streams },
      { path: "/verified", component: Verified },
      { path: "/search", component: Search },
      { path: "/china", component: China },
      { path: "/collected", component: Collected },
      { path: "/favorites", component: Favorites },
      { path: "/playlists", component: Playlists },
      { path: "/library", component: Playlists },
      { path: "/playlist-player", component: PlaylistPlayer },
      { path: "/watch", component: Watch },
      { path: "/about", component: About },
      { path: "*404", component: NotFound },
    ],
  },
]);

export const Router = createRouter({
  routes,
  history: IS_ELECTRON ? hashHistory() : browserHistory(),
});
