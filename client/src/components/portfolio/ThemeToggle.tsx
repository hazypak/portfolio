/** Light/dark switch with a glowing knob and a synthesized switch sound. */
import { Moon, Sun } from "lucide-react";
import { playThemeSwitch } from "@/lib/sfx";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      aria-checked={isLight}
      aria-label="Light theme"
      className="theme-toggle"
      data-on={isLight}
      onClick={event => {
        const next = toggle(event.currentTarget);
        playThemeSwitch(next === "light");
      }}
      role="switch"
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      type="button"
    >
      <Moon
        aria-hidden="true"
        className="theme-toggle__icon theme-toggle__icon--moon"
        size={13}
      />
      <Sun
        aria-hidden="true"
        className="theme-toggle__icon theme-toggle__icon--sun"
        size={13}
      />
      <span aria-hidden="true" className="theme-toggle__knob" />
    </button>
  );
}
