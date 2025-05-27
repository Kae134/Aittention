"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpData } from "@/schemas/auth-schema";
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
import { useRegister } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import AnimatedFormMessage from "@/components/ui/animated-form-message";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { registerUser, isLoading } = useRegister();

  /**
   * Gère la soumission du formulaire d'inscription.
   */
  async function onSubmit(values: SignUpData) {
    const result = await registerUser(values);
    if (result?.success) {
      toast.success("Account created successfully");
      router.push("/sign-in");
    } else {
      toast.error(result?.error || "Unknown error");
    }
  }

  // Helper to compute showError for a field
  const getShowError = (field: keyof SignUpData) =>
    !!form.formState.errors[field] && form.formState.isSubmitted;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => {
            const showError = getShowError("fullName");
            const isSubmitted = form.formState.isSubmitted;
            return (
              <FormItem>
                <FormLabel className="sr-only">Full Name</FormLabel>
                <FormControl showError={showError}>
                  <Input
                    placeholder="Full Name"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <AnimatedFormMessage
                  show={!!form.formState.errors.fullName}
                  isSubmitted={isSubmitted}
                />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            const showError = getShowError("email");
            const isSubmitted = form.formState.isSubmitted;
            return (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl showError={showError}>
                  <Input
                    type="text" // No native validation
                    placeholder="example@email.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <AnimatedFormMessage
                  show={!!form.formState.errors.email}
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
            const showError = getShowError("password");
            const isSubmitted = form.formState.isSubmitted;
            return (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl showError={showError}>
                  <Input
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <AnimatedFormMessage
                  show={!!form.formState.errors.password}
                  isSubmitted={isSubmitted}
                />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => {
            const showError = getShowError("confirmPassword");
            const isSubmitted = form.formState.isSubmitted;
            return (
              <FormItem>
                <FormLabel className="sr-only">Confirm Password</FormLabel>
                <FormControl showError={showError}>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <AnimatedFormMessage
                  show={!!form.formState.errors.confirmPassword}
                  isSubmitted={isSubmitted}
                />
              </FormItem>
            );
          }}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
