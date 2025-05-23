import { z } from "zod";

/**
 * Schéma de validation pour la connexion utilisateur
 */
export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export type SignInData = z.infer<typeof signInSchema>;

/**
 * Schéma de validation pour l'inscription utilisateur
 */
export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Name must contain at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, {
        message: "Password must contain at least 6 characters",
      })
      .max(20, {
        message: "Password must contain at most 20 characters",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /\d/.test(val), {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
