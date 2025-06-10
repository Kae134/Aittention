"use client";

import Link from "next/link";
import { motion, useMotionValue, animate, MotionValue } from "motion/react";
import AnimatedHeatmapLogo from "@/components/ui/animated-heatmap-logo";
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
  { href: "/analyze", label: "Analyze" },
  { href: "/docs", label: "Docs" },
  { href: "/team", label: "Team" },
  { href: "/faq", label: "FAQ" },
  { href: "/pricing", label: "Pricing" },
];

export default function HomeNavbar() {
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem('access_token'));
    }
  }, []);

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

  // Trouver l'index du lien actif
  const activeIdx = LINKS.findIndex((link) => pathname.startsWith(link.href));

  // Mettre à jour la position du slider en fonction du lien survolé
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

      // Animer les valeurs de mouvement pour des transitions fluides
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

  // Gérer l'entrée de la souris sur un lien
  const handleMouseEnter = useCallback(
    (idx: number) => {
      updateSliderPosition(idx);
    },
    [updateSliderPosition]
  );

  // Gérer la sortie de la souris de toute la navigation
  const handleMouseLeave = useCallback(() => {
    updateSliderPosition(null);
  }, [updateSliderPosition]);

  // Au montage ou lorsque activeIdx change, mettre à jour la position initiale
  useLayoutEffect(() => {
    // S'il y a un lien actif, positionner le slider là initialement
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
      <div className="w-full h-16 px-4 flex items-center justify-between border-b border-accent-foreground/10 bg-gradient-to-br from-background/80 to-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between h-full">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-xl font-extrabold uppercase tracking-widest text-foreground"
            >
              <div className="flex items-center">
                <AnimatedHeatmapLogo />
                Aittention
              </div>
            </Link>

            {/* Liens de navigation avec effet de survol */}
            <div
              ref={navRef}
              className="relative flex items-center px-1"
              onMouseLeave={handleMouseLeave}
            >
              {/* Élément d'arrière-plan coulissant */}
              {sliderParams.visible && (
                <motion.div
                  ref={sliderRef}
                  className="absolute top-1/2 -translate-y-1/2 h-9 bg-card dark:bg-popover rounded-lg z-0"
                  style={{
                    width: sliderWidth,
                    left: sliderX,
                    pointerEvents: "none",
                  }}
                  initial={false}
                />
              )}

              {/* Liens de navigation */}
              {LINKS.map((link, idx) => {
                const isActive = idx === activeIdx;

                return (
                  <div
                    key={link.href + idx}
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

            <motion.div
              whileHover={{ scale: 1.0, boxShadow: "0 2px 16px 0 #6366f1aa" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="rounded-xl"
              >
              <Button
                variant="outline"
                className="cursor-pointer border-accent-foreground/20 hover:border-primary/80 bg-transparent text-foreground font-semibold transition-all duration-200 rounded-xl"
                size="default"
                asChild
                >
                {token ? (
                  <Link href="/dashboard">Go to Dashboard</Link>
                ) : (
                  <Link href="/sign-in">Login</Link>
                )}
              </Button>
            </motion.div>
            {!token && (
              <motion.div
              whileHover={{ scale: 1.0, boxShadow: "0 4px 32px 0 #6366f1cc" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="rounded-xl"
              >
              <Button
                variant="default"
                className="cursor-pointer bg-accent-foreground/95 hover:bg-accent-foreground text-primary-foreground font-bold shadow-lg hover:shadow-xl border-0 px-5 py-2 rounded-xl transition-all duration-200"
                asChild
              >
                <Link href="/analyze">Commencer gratuitement</Link>
              </Button>
              </motion.div>
            )}
            {token && (
              <motion.div
              whileHover={{ scale: 1.0, boxShadow: "0 2px 16px 0 #ef4444aa" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="rounded-xl"
              >
              <Button
                variant="destructive"
                className="cursor-pointer font-semibold rounded-xl"
                size="default"
                onClick={() => {
                localStorage.removeItem('access_token');
                window.location.reload();
                }}
              >
                Déconnexion
              </Button>
              </motion.div>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

// Composant NavLink pour gérer l'effet de masquage indépendamment
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
  // État pour stocker les dimensions du masque de découpage
  const [clipMask, setClipMask] = useState({
    left: 0,
    right: 0,
    active: false,
  });

  // vérifie si le composant est monté
  const isMounted = useRef(true);

  // Mise à jour de la position du lien et du masque de découpage lorsque les valeurs changent
  useEffect(() => {
    if (!linkRef || !navRef) return;

    // Fonction pour mettre à jour les dimensions du masque
    const updateMaskPosition = () => {
      if (!sliderVisible || !isMounted.current) {
        setClipMask((prev) => ({ ...prev, active: false }));
        return;
      }

      const linkRect = linkRef.getBoundingClientRect();
      const navRect = navRef.getBoundingClientRect();

      // Obtenion des valeurs actuelles du slider et calcule de leur positions
      const currentSliderX = sliderX.get();
      const currentSliderWidth = sliderWidth.get();
      const sliderRight = currentSliderX + currentSliderWidth;

      const linkLeft = linkRect.left - navRect.left;
      const linkRight = linkLeft + linkRect.width;

      // Vérification que le slider chevauche le lien
      const hasOverlap = !(
        sliderRight <= linkLeft || currentSliderX >= linkRight
      );

      if (!hasOverlap) {
        setClipMask((prev) => ({ ...prev, active: false }));
        return;
      }

      // Calcule les positions exactes en pixels pour le masque de découpage
      const clipLeft = Math.max(0, currentSliderX - linkLeft);
      const clipRight = Math.min(linkRect.width, sliderRight - linkLeft);

      setClipMask({
        left: clipLeft,
        right: clipRight,
        active: true,
      });
    };

    // Mise à jour initiale
    updateMaskPosition();

    // suivis dechangements de valeurs de mouvement
    const subscribeX = sliderX.on("change", updateMaskPosition);
    const subscribeWidth = sliderWidth.on("change", updateMaskPosition);

    // Mise à jour lors du redimensionnement
    const resizeObserver = new ResizeObserver(updateMaskPosition);
    resizeObserver.observe(linkRef);

    // Nettoyage
    return () => {
      isMounted.current = false;
      subscribeX();
      subscribeWidth();
      resizeObserver.disconnect();
    };
  }, [linkRef, navRef, sliderX, sliderWidth, sliderVisible]);

  return (
    <div className="relative px-4 py-2 rounded-lg">
      {/* Conteneur de même taille que le texte pour le calcul de découpage */}
      <div className="relative">
        {/* Couleur de texte par défaut (couche de base) */}
        <span
          className={`block font-semibold text-base ${
            isActive ? "text-foreground" : "text-foreground/80"
          } select-none pointer-events-none font-regular`}
        >
          {label}
        </span>

        {/* Superposition de couleur de texte au survol avec découpage */}
        <motion.span
          className="absolute inset-0 font-semibold text-base text-card-foreground dark:text-popover-foreground select-none pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: clipMask.active ? 1 : 0,
          }}
          style={{
            clipPath: `polygon(${clipMask.left}px 0, ${clipMask.right}px 0, ${clipMask.right}px 100%, ${clipMask.left}px 100%)`,
            WebkitClipPath: `polygon(${clipMask.left}px 0, ${clipMask.right}px 0, ${clipMask.right}px 100%, ${clipMask.left}px 100%)`,
          }}
        >
          {label}
        </motion.span>
      </div>

      {/* Indicateur de lien actif */}
      {isActive && (
        <motion.div
          layoutId="active-underline"
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-[3px] bg-foreground rounded-full"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}

      {/* Lien réel pour la navigation/accessibilité */}
      <Link
        href={href}
        className="absolute inset-0 w-full h-full opacity-0"
        aria-label={label}
      />
    </div>
  );
}
