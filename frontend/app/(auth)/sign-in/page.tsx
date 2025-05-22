"use client";

import AnimatedHeatmapLogo from "@/components/ui/animated-heatmap-logo";
import SignInForm from "./sign-in-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-w-sm w-full flex flex-col gap-4">
      <div className="flex justify-center items-center flex-col">
        <AnimatedHeatmapLogo size={100} />
        <h1 className="text-4xl font-bold text-center">Welcome back!</h1>
      </div>

      <p className="text-center text-md text-muted-foreground">
        Sign in to your account
      </p>
      <SignInForm />
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
