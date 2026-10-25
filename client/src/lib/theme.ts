/**
 * Theme state lives on <html data-theme>, set before paint by
 * /theme-init.js. Switching uses a View Transition that reveals the new
 * theme as a circle growing from the toggle; browsers without it, and
 * visitors who prefer reduced motion, get an instant swap.
 */
import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const THEME_COLORS: Record<Theme, string> = {
  dark: "#05070b",
  light: "#eef2f7",
};

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  const toggle = useCallback((origin?: HTMLElement | null) => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDoc;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!doc.startViewTransition || reduceMotion) {
      applyTheme(next);
      return next;
    }

    const rect = origin?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 32;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => undefined);
    return next;
  }, []);

  return { theme, toggle };
}
