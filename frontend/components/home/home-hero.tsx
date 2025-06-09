"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/shadcn-ui/button";
import { AuroraText } from "../magicui/aurora-text";
import { motion } from "motion/react";
import AnimatedBeamDemo from "./animated-beam-bidirectional";

export default function HomeHero() {
  return (
    <div className="max-w-4xl py-50 flex flex-col items-center justify-center text-center space-y-8">
      <AnimatedBeamDemo />
      <h1 className="text-6xl font-bold">
        Unlock your website&#39;s potential with{" "}
        <AuroraText>Aittention</AuroraText>
      </h1>
      <h2 className="text-xl font-medium text-muted-foreground">
        See exactly where your visitors focus, why they click (or don&#39;t),
        and how to optimize every pixel with the power of AI.
      </h2>
      <div className="flex items-center justify-center space-x-4">
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
            <Link href="/mvp">Get Started for Free</Link>
          </Button>
        </motion.div>
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
            <Link href="/sign-in">Login</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
