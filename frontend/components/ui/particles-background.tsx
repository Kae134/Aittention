"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

/**
 * Returns the current theme ("dark" or "light") by checking the class on <html>.
 */
function useThemeClass(): "dark" | "light" {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const html = document.documentElement;
    const updateTheme = () => {
      setTheme(html.classList.contains("dark") ? "dark" : "light");
    };
    updateTheme();
    // Listen for class changes (ThemeProvider may change it)
    const observer = new MutationObserver(updateTheme);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

/**
 * Renders a smooth, premium particle background using tsParticles, theme-aware.
 */
export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const theme = useThemeClass();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = useMemo(() => {
    const isDark = theme === "dark";
    return {
      fullScreen: { enable: true, zIndex: -1 },
      background: {
        color: {
          value: isDark
            ? "oklch(14.68% 0.008581901886460968 285.29444791248034)"
            : "oklch(0.96 0 0)",
        },
      },
      particles: {
        color: { value: isDark ? "#ffffff" : "#0ea5e9" },
        number: { value: 40, density: { enable: true, area: 3000 } },
        opacity: { value: 0.5 },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: { default: "out" },
        },
        links: {
          enable: true,
          color: isDark ? "#ffffff" : "#0ea5e9",
          opacity: 0.4,
          distance: 120,
        },
      },
      detectRetina: true,
    };
  }, [theme]);

  if (!init) return null;
  return <Particles id="tsparticles" options={options} />;
}
