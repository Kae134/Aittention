"use client"

import AppLogo from '@/components/ui/app-logo'
import SignInForm from "./sign-in-form";

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
    </div>
  );
}