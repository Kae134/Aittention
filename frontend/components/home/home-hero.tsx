import Link from "next/link";
import React from "react";
import { Button } from "@/components/shadcn-ui/button";
import { AuroraText } from "../magicui/aurora-text";

export default function HomeHero() {
  return (
    <div className="max-w-4xl py-50 flex flex-col items-center justify-center text-center space-y-8">
      <h1 className="text-6xl font-bold">
        Unlock your website&#39;s potential with <AuroraText>Aittention</AuroraText>
      </h1>
      <h2 className="text-xl font-medium text-muted-foreground">
        See exactly where your visitors focus, why they click (or don&#39;t), and how to optimize every pixel with the power of AI.
      </h2>
      <div className="flex items-center justify-center space-x-4">
        <Button className="cursor-pointer" size="lg" asChild>
          <Link href="mvp">
            <span className="text-sm font-medium">Get Started for Free</span>
          </Link>
        </Button>
        <Button variant="outline" className="cursor-pointer" size="lg" asChild>
          <Link href="/sign-in">
            <span className="text-sm font-medium">Sign In</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
