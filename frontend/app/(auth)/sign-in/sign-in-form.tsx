"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInData } from "@/schemas/auth-schema";

import { Button } from "@/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { toast } from "sonner";

import AnimatedFormMessage from "@/components/ui/animated-form-message";
import { useSignIn } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function SignInForm() {

  const router = useRouter();

  // Initialisation du formulaire avec validation zod
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signInUser, isLoading } = useSignIn();

  async function onSubmit(values: SignInData) {
    const response = await signInUser(values);
    if (response.success) {
      toast.success("Sign in successful");
      router.push("/dashboard");
    } else {
      toast.error(
        response.error || "Incorrect credentials or connection error"
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            const hasError = !!form.formState.errors.email;
            const isSubmitted = form.formState.isSubmitted;
            const showError = hasError && isSubmitted;

            return (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl showError={showError}>
                  <Input
                    type="text"
                    placeholder="example@email.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <AnimatedFormMessage
                  show={hasError}
                  isSubmitted={isSubmitted}
                />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            const hasError = !!form.formState.errors.password;
            const isSubmitted = form.formState.isSubmitted;
            const showError = hasError && isSubmitted;

            return (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl showError={showError}>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Connexion...
            </span>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
}
