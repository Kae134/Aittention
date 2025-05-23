import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z
        .string()
        .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
        .max(20, { message: "Le mot de passe doit contenir au maximum 20 caractères" })
        .refine((val) => /[a-z]/.test(val), {
            message: "Le mot de passe doit contenir au moins une lettre minuscule",
        })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Le mot de passe doit contenir au moins une lettre majuscule",
        })
        .refine((val) => /\d/.test(val), {
            message: "Le mot de passe doit contenir au moins un chiffre",
        })
});

export type SignInData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    fullName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z
        .string()
        .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
        .max(20, { message: "Le mot de passe doit contenir au maximum 20 caractères" })
        .refine((val) => /[a-z]/.test(val), {
            message: "Le mot de passe doit contenir au moins une lettre minuscule",
        })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Le mot de passe doit contenir au moins une lettre majuscule",
        })
        .refine((val) => /\d/.test(val), {
            message: "Le mot de passe doit contenir au moins un chiffre",
        }),
        confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

export type SignUpData = z.infer<typeof signUpSchema>;