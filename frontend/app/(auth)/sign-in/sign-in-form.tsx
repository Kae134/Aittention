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
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { toast } from "sonner";

export default function SignInForm() {
  // Initialisation du formulaire avec validation zod
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Sign in with Email
        </Button>
      </form>
    </Form>
  );
}
