import { render } from "@solidjs/web";
import { appState, initializeAppState } from "../lib/stores";
import { Router } from "../routes/router";
import "./index.css";

const root = document.getElementById("root");

if (!root) throw new Error("Root element was not found");

if (!localStorage.getItem("alltvcnl.theme.v1") && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  appState.setTheme("dark");
}

render(() => {
  initializeAppState();
  return <Router>{(props) => props.children}</Router>;
}, root);
