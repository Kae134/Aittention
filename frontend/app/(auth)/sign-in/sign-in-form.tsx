"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInData } from "@/schemas/auth-schema";
import { signInAction } from "./sign-in.action";
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

export default function SignInForm() {
  // Initialisation du formulaire avec validation zod
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInData) {
    const response = await signInAction(values);
    if (response.success) {
      toast.success("Sign in successful");
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

        <Button type="submit" className="w-full cursor-pointer">
          Sign in with Email
        </Button>
      </form>
    </Form>
  );
}
