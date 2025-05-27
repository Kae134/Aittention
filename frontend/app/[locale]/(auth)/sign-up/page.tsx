"use client";

import SignUpForm from "./sign-up-form";
import Link from "next/link";
import AnimatedHeatmapLogo from "@/components/ui/animated-heatmap-logo";

export default function SignUpPage() {
  return (
    <div className="max-w-sm w-full flex flex-col gap-4">
      <div className="flex justify-center items-center flex-col">
        <AnimatedHeatmapLogo size={100} />
        <h1 className="text-4xl font-bold text-center">Create an Account</h1>
      </div>

      <p className="text-center text-md text-muted-foreground">
        Sign up to get started
      </p>
      <SignUpForm />
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
