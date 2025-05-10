"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

// Import du schéma de validation depuis le fichier séparé
import { signInSchema, type SignInData } from '@/schemas/auth-schema'

export default function LoginPage() {
  const router = useRouter()

  // Initialisation du formulaire avec react-hook-form et le schéma importé
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Fonction de soumission du formulaire
  function onSubmit(values: SignInData) {
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