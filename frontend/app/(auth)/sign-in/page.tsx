"use client";

import AppLogo from "@/components/ui/app-logo";
import SignInForm from "./sign-in-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-w-sm w-full flex flex-col gap-4">
      <div className="flex justify-center">
        <AppLogo size="42" />
      </div>
      <h1 className="text-4xl font-bold text-center">Sign In</h1>
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
