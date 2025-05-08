"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/shadcn-ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'
import AppLogo from '@/components/ui/app-logo'
import Link from 'next/link'

// Définition du schéma de validation
const formSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
    .max(20, { message: "Le mot de passe doit contenir au maximum 20 caractères" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/, {
      message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
    }),
})

export default function LoginPage() {
  const router = useRouter()

  // Initialisation du formulaire avec react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Fonction de soumission du formulaire
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Traitement de la connexion ici
    // router.push('/dashboard')
  }

  return (
    <div className="max-w-sm w-full flex flex-col gap-4">
      <div className="flex justify-center">
        <AppLogo size="42" />
      </div>
      <h1 className="text-4xl font-bold text-center">Welcom back</h1>
      <p className="text-center text-md text-muted-foreground">
        Login to your account
      </p>
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
                    placeholder="exemple@email.com"
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
                <FormLabel className="sr-only">Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Sign In with Email
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-4">
        <div className="h-px w-full bg-muted"></div>
        <p className="text-center uppercase text-xs text-muted-foreground">or</p>
        <div className="h-px w-full bg-muted"></div>
      </div>

      <Button variant="outline" className="w-full cursor-pointer">
        Sign In with Google
      </Button>

      <Link href="/sign-up" className="text-center text-sm text-muted-foreground underline">
        Don't have an account? Sign Up
      </Link>
    </div>
  )
}