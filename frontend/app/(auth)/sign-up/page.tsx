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
import { Checkbox } from '@/components/shadcn-ui/checkbox'
import AppLogo from '@/components/ui/app-logo'
import Link from 'next/link'

// Import du schéma de validation depuis le fichier séparé
import { signUpSchema, type SignUpData } from '@/schemas/auth-schema'

export default function SignUpPage() {
  const router = useRouter()

  // Initialisation du formulaire avec react-hook-form et le schéma importé
  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  })

  // Fonction de soumission du formulaire
  function onSubmit(values: SignUpData) {
    console.log(values)
    // Traitement de l'inscription ici
    // router.push('/dashboard')
  }

  return (
    <div className="max-w-sm w-full flex flex-col gap-4">
      <div className="flex justify-center">
        <AppLogo size="42" />
      </div>
      <h1 className="text-4xl font-bold text-center">Create an Account</h1>
      <p className="text-center text-md text-muted-foreground">
        Sign up to get started
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I accept the <Link href="/terms" className="underline">terms and conditions</Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Create Account
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-4">
        <div className="h-px w-full bg-muted"></div>
        <p className="text-center uppercase text-xs text-muted-foreground">or</p>
        <div className="h-px w-full bg-muted"></div>
      </div>

      <Button variant="outline" className="w-full cursor-pointer">
        Sign Up with Google
      </Button>

      <Link href="/sign-in" className="text-center text-sm text-muted-foreground underline">
        Already have an account? Sign In
      </Link>
    </div>
  )
}