"use client";

import AppLogo from "@/components/ui/app-logo";
import SignUpForm from "./sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="max-w-sm w-full flex flex-col gap-4">
      <div className="flex justify-center">
        <AppLogo size="42" />
      </div>
      <h1 className="text-4xl font-bold text-center">Create an Account</h1>
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
