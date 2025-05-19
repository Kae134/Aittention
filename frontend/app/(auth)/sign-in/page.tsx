"use client"

import AppLogo from '@/components/ui/app-logo'
import SignInForm from "./sign-in-form";
import Link from 'next/link';
import { Button } from '@/components/shadcn-ui/button';
import { Github } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="max-w-sm w-full flex flex-col gap-4">
      <div className="flex justify-center">
        <AppLogo size="42" />
      </div>
      <h1 className="text-4xl font-bold text-center">Welcome back</h1>
      <p className="text-center text-md text-muted-foreground">
        Login to your account
      </p>
      <SignInForm />
      <div className="">
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-muted-foreground" />
          <span className="px-4 text-muted-foreground">or</span>
          <div className="flex-grow border-t border-muted-foreground" />
        </div>
      </div>
      <Button
        variant="outline"
      >
        <Github />
        GitHub
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}