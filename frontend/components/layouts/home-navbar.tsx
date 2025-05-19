"use client";

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import AppLogo from "@/components/ui/app-logo";
import { Button } from "@/components/shadcn-ui/button";
import RepoStars from "@/components/ui/repo-stars";
import { useRef, useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function HomeNavbar() {
  const pathname = usePathname();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [slider, setSlider] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement | null>(null);

  // Find the active link index
  const activeIdx = LINKS.findIndex((link) => pathname.startsWith(link.href));

  // Update slider position on hover
  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    const node = linkRefs.current[idx];
    const navNode = navRef.current;
    if (node && navNode) {
      const { left, width } = node.getBoundingClientRect();
      const navLeft = navNode.getBoundingClientRect().left;
      setSlider({ left: left - navLeft, width });
    }
  };
  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setSlider({ left: 0, width: 0 });
  };

  // On mount, set slider to first link (optional: for initial animation)
  useLayoutEffect(() => {
    if (linkRefs.current[0] && navRef.current) {
      const { left, width } = linkRefs.current[0].getBoundingClientRect();
      const navLeft = navRef.current.getBoundingClientRect().left;
      setSlider({ left: left - navLeft, width });
    }
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-0 left-0 w-full z-30 shadow-lg"
    >
      <div className="w-full h-16 px-4 flex items-center justify-between border-b border-white/10 bg-gradient-to-br from-[#18181b]/80 to-[#23272f]/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between h-full">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <AppLogo />
              <Link
                href="/"
                className="text-xl font-extrabold uppercase tracking-widest text-white drop-shadow-sm"
              >
                Aittention
              </Link>
            </div>
            {/* Vercel-style nav links with sliding hover background and active underline */}
            <nav
              ref={navRef}
              className="relative flex items-center space-x-6"
              onMouseLeave={handleMouseLeave}
            >
              {/* Sliding hover background (only for hovered, non-active link) */}
              {hoveredIdx !== null && hoveredIdx !== activeIdx && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 h-9 bg-white/90 rounded-lg z-0"
                  animate={{
                    left: slider.left,
                    width: slider.width,
                    opacity: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    mass: 1.2,
                  }}
                  style={{ pointerEvents: "none" }}
                />
              )}
              {LINKS.map((link, idx) => {
                const isActive = idx === activeIdx;
                // Calculate clip-path for the top text layer
                let leftClip = 0;
                let rightClip = 0;
                const node = linkRefs.current[idx];
                if (
                  node &&
                  navRef.current &&
                  slider.width > 0 &&
                  hoveredIdx === idx &&
                  !isActive
                ) {
                  const linkRect = node.getBoundingClientRect();
                  const navRect = navRef.current.getBoundingClientRect();
                  const bgLeft = navRect.left + slider.left;
                  const bgRight = bgLeft + slider.width;
                  const linkLeft = linkRect.left;
                  const linkRight = linkRect.right;
                  leftClip = Math.max(0, bgLeft - linkLeft);
                  rightClip = Math.max(0, linkRight - bgRight);
                }
                return (
                  <div
                    key={link.href}
                    ref={(el) => {
                      linkRefs.current[idx] = el;
                    }}
                    className="relative z-10 px-0"
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onFocus={() => handleMouseEnter(idx)}
                  >
                    {/* Bottom layer: dark text only for hovered, non-active link */}
                    {hoveredIdx === idx && !isActive && (
                      <span className="block font-semibold text-base px-4 py-2 rounded-lg text-gray-900 select-none pointer-events-none">
                        {link.label}
                      </span>
                    )}
                    {/* Top layer: light text, masked with clip-path only for hovered, non-active link */}
                    {hoveredIdx === idx && !isActive ? (
                      <span
                        className="block font-semibold text-base px-4 py-2 rounded-lg text-white/80 absolute inset-0 select-none pointer-events-none"
                        style={{
                          WebkitClipPath: `inset(0px ${rightClip}px 0px ${leftClip}px)`,
                          clipPath: `inset(0px ${rightClip}px 0px ${leftClip}px)`,
                          transition:
                            "clip-path 0.35s cubic-bezier(.77,0,.175,1)",
                        }}
                      >
                        {link.label}
                      </span>
                    ) : (
                      <span
                        className={`block font-semibold text-base px-4 py-2 rounded-lg ${
                          isActive ? "text-white" : "text-white/80"
                        } select-none pointer-events-none`}
                      >
                        {link.label}
                      </span>
                    )}
                    {/* Real link for accessibility */}
                    <Link
                      href={link.href}
                      className="absolute inset-0 w-full h-full opacity-0 focus:opacity-100 focus:relative focus:z-20"
                      tabIndex={0}
                      aria-label={link.label}
                    />
                    {/* Active underline */}
                    {isActive && (
                      <motion.div
                        layoutId="active-underline"
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-[3px] bg-white rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <RepoStars />
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.06, boxShadow: "0 2px 16px 0 #6366f1aa" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="rounded-xl"
            >
              <Button
                variant="outline"
                className="cursor-pointer border-white/20 hover:border-primary/80 bg-transparent text-white font-semibold transition-all duration-200 rounded-xl"
                size="default"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.09, boxShadow: "0 4px 32px 0 #6366f1cc" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="rounded-xl"
            >
              <Button
                variant="default"
                className="cursor-pointer bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white font-bold shadow-lg hover:shadow-xl border-0 px-5 py-2 rounded-xl transition-all duration-200"
                asChild
              >
                <Link href="/mvp">Get Started for Free</Link>
              </Button>
            </motion.div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
