import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * AnimatedTitle affiche un titre avec un effet machine à écrire animé
 * - À chaque changement de prop title, le titre s'efface lettre par lettre puis s'affiche lettre par lettre
 */
export default function AnimatedTitle({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState(title.length);
  const [phase, setPhase] = useState<"idle" | "erasing" | "typing">("idle");
  const [current, setCurrent] = useState(title);
  const prevTitle = useRef(title);

  useEffect(() => {
    if (title !== prevTitle.current) {
      setPhase("erasing");
    }
  }, [title]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (phase === "erasing" && displayed > 0) {
      timeout = setTimeout(() => setDisplayed((d) => d - 1), 30);
    } else if (phase === "erasing" && displayed === 0) {
      setCurrent(title);
      setPhase("typing");
    } else if (phase === "typing" && displayed < title.length) {
      timeout = setTimeout(() => setDisplayed((d) => d + 1), 40);
    } else if (phase === "typing" && displayed === title.length) {
      setPhase("idle");
      prevTitle.current = title;
    }
    return () => clearTimeout(timeout);
  }, [phase, displayed, title]);

  // Si le titre n'a jamais changé, on affiche tout
  useEffect(() => {
    if (phase === "idle" && displayed !== title.length) {
      setDisplayed(title.length);
      setCurrent(title);
      prevTitle.current = title;
    }
  }, [phase, title, displayed]);

  return (
    <span
      className={className}
      style={{ display: "inline-block", minHeight: "1em" }}
    >
      {current
        .slice(0, displayed)
        .split("")
        .map((char, i) => (
          <motion.span
            key={i + char}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, delay: i * 0.02 }}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
    </span>
  );
}
