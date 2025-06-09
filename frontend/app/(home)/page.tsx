import AnimatedBeamDemo from "@/components/home/animated-beam-bidirectional";
import HomeHero from "@/components/home/home-hero";
import { MarqueeDemo } from "@/components/home/reviews-card";
import RippleDemo from "@/components/home/ripple-demo";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <HomeHero />
      <AnimatedBeamDemo />
      <div className="space-y-4 text-center">
        <h2 className="text-5xl font-bold">What people are saying</h2>
      </div>
      <MarqueeDemo />
      <RippleDemo />
    </div>
  );
}
