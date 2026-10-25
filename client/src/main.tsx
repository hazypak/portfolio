import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

/**
 * Reveal the app only once React has painted and the fonts are in, so
 * visitors never see fallback fonts or unstyled markup. Capped so a slow
 * connection can't hold the page hostage.
 */
const FONT_WAIT_CAP_MS = 1800;

let revealed = false;

function reveal() {
  if (revealed) return;
  revealed = true;
  const root = document.documentElement;
  root.classList.add("ready");
  root.classList.remove("booting");
  window.setTimeout(() => document.getElementById("boot")?.remove(), 600);
}

// fonts.ready alone can resolve before any load starts, so request the faces
// the first screen uses explicitly.
const fontsLoaded = Promise.all([
  document.fonts.load('800 1em "Archivo Variable"'),
  document.fonts.load('400 1em "Archivo Variable"'),
  document.fonts.load('400 1em "IBM Plex Mono"'),
]).catch(() => undefined);

Promise.race([
  fontsLoaded,
  new Promise(resolve => window.setTimeout(resolve, FONT_WAIT_CAP_MS)),
]).then(() => {
  // Two frames lets React's first paint land before the fade. Background
  // tabs don't run animation frames, so a timer guarantees the reveal.
  requestAnimationFrame(() => requestAnimationFrame(reveal));
  window.setTimeout(reveal, 120);
});
