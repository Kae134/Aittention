"use client";

"use client";

import Link from "next/link";
import { motion, useMotionValue, animate, MotionValue } from "motion/react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import AppLogo from "@/components/ui/app-logo";
import { Button } from "@/components/shadcn-ui/button";
import RepoStars from "@/components/ui/repo-stars";
import {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
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
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sliderParams, setSliderParams] = useState({
    left: 0,
    width: 0,
    visible: false,
  });
  const navRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderX = useMotionValue(0);
  const sliderWidth = useMotionValue(0);

  // Find the active link index
  const activeIdx = LINKS.findIndex((link) => pathname.startsWith(link.href));

  // Update slider position based on the hovered link
  const updateSliderPosition = useCallback(
    (idx: number | null) => {
      if (idx === null) {
        setSliderParams((prev) => ({ ...prev, visible: false }));
        return;
      }

      const node = linkRefs.current[idx];
      const navNode = navRef.current;
      if (!node || !navNode) return;

      const { left, width } = node.getBoundingClientRect();
      const navLeft = navNode.getBoundingClientRect().left;
      const newLeft = left - navLeft;

      setSliderParams({ left: newLeft, width, visible: true });

      // Animate motion values for smooth transitions
      animate(sliderX, newLeft, {
        type: "spring",
        stiffness: 400,
        damping: 40,
      });

      animate(sliderWidth, width, {
        type: "spring",
        stiffness: 400,
        damping: 40,
      });
    },
    [sliderX, sliderWidth]
  );

  // Handle mouse enter on link
  const handleMouseEnter = useCallback(
    (idx: number) => {
      updateSliderPosition(idx);
    },
    [updateSliderPosition]
  );

  // Handle mouse leave on entire nav
  const handleMouseLeave = useCallback(() => {
    updateSliderPosition(null);
  }, [updateSliderPosition]);

  // On mount or when activeIdx changes, update initial position
  useLayoutEffect(() => {
    // If there's an active link, position slider there initially
    if (activeIdx >= 0) {
      updateSliderPosition(activeIdx);
    }
  }, [activeIdx, updateSliderPosition]);

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

            {/* Navigation links with hover effect */}
            <div
              ref={navRef}
              className="relative flex items-center space-x-6"
              onMouseLeave={handleMouseLeave}
            >
              {/* Sliding background element */}
              {sliderParams.visible && (
                <motion.div
                  ref={sliderRef}
                  className="absolute top-1/2 -translate-y-1/2 h-9 bg-white rounded-lg z-0"
                  style={{
                    width: sliderWidth,
                    left: sliderX,
                    pointerEvents: "none",
                  }}
                  initial={false}
                />
              )}

              {/* Navigation Links */}
              {LINKS.map((link, idx) => {
                const isActive = idx === activeIdx;

                return (
                  <div
                    key={link.href}
                    ref={(el) => {
                      if (linkRefs.current) linkRefs.current[idx] = el;
                    }}
                    className="relative z-10 px-0"
                    onMouseEnter={() => handleMouseEnter(idx)}
                  >
                    <NavLink
                      label={link.label}
                      href={link.href}
                      isActive={isActive}
                      sliderX={sliderX}
                      sliderWidth={sliderWidth}
                      linkRef={linkRefs.current[idx]}
                      navRef={navRef.current}
                      sliderVisible={sliderParams.visible}
                    />
                  </div>
                );
              })}
            </div>
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

// NavLink component to handle the masking effect independently
function NavLink({
  label,
  href,
  isActive,
  sliderX,
  sliderWidth,
  linkRef,
  navRef,
  sliderVisible,
}: {
  label: string;
  href: string;
  isActive: boolean;
  sliderX: MotionValue<number>;
  sliderWidth: MotionValue<number>;
  linkRef: HTMLDivElement | null;
  navRef: HTMLDivElement | null;
  sliderVisible: boolean;
}) {
  const [clipMask, setClipMask] = useState({
    left: 0,
    right: 0,
    active: false,
  });

  // Use an effect to update the mask position in sync with the slider animation
  useEffect(() => {
    // Skip if refs or sliderVisible are not ready
    if (!linkRef || !navRef) return;

    // Function to calculate and update mask positions
    const updateMaskPosition = () => {
      if (!sliderVisible) {
        setClipMask({ left: 0, right: 0, active: false });
        return;
      }

      const linkRect = linkRef.getBoundingClientRect();
      const navRect = navRef.getBoundingClientRect();

      // Get current slider values
      const currentSliderX = sliderX.get();
      const currentSliderWidth = sliderWidth.get();

      // Calculate positions relative to the link
      const sliderLeft = currentSliderX;
      const sliderRight = currentSliderX + currentSliderWidth;

      const linkLeft = linkRect.left - navRect.left;
      const linkRight = linkLeft + linkRect.width;

      // Check if slider overlaps with this link
      if (sliderRight < linkLeft || sliderLeft > linkRight) {
        setClipMask({ left: 0, right: 0, active: false });
        return;
      }

      // Calculate clip coordinates in pixels
      const clipLeft = Math.max(0, sliderLeft - linkLeft);
      const clipRight = Math.min(linkRect.width, sliderRight - linkLeft);

      setClipMask({
        left: clipLeft,
        right: clipRight,
        active: true,
      });
    };

    // Update initially
    updateMaskPosition();

    // Set up a subscription to motion values
    const unsubscribeX = sliderX.on("change", updateMaskPosition);
    const unsubscribeWidth = sliderWidth.on("change", updateMaskPosition);

    return () => {
      unsubscribeX();
      unsubscribeWidth();
    };
  }, [linkRef, navRef, sliderVisible, sliderX, sliderWidth]);

  return (
    <div className="relative px-4 py-2 rounded-lg">
      {/* Container with same size as text for clipping calculation */}
      <div className="relative">
        {/* White text (base layer) */}
        <span
          className={`block font-semibold text-base ${
            isActive ? "text-white" : "text-white/80"
          } select-none pointer-events-none`}
        >
          {label}
        </span>

        {/* Black text overlay with clipping */}
        {clipMask.active && (
          <span
            className="absolute inset-0 font-semibold text-base text-black select-none pointer-events-none flex items-center justify-center"
            style={{
              clipPath: `polygon(${clipMask.left}px 0, ${clipMask.right}px 0, ${clipMask.right}px 100%, ${clipMask.left}px 100%)`,
              WebkitClipPath: `polygon(${clipMask.left}px 0, ${clipMask.right}px 0, ${clipMask.right}px 100%, ${clipMask.left}px 100%)`,
            }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Active link indicator */}
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

      {/* Actual link for navigation/accessibility */}
      <Link
        href={href}
        className="absolute inset-0 w-full h-full opacity-0"
        aria-label={label}
      />
    </div>
  );
}
