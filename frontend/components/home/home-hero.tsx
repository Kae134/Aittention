import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/shadcn-ui/button'

export default function HomeHero() {
  return (
      <div className="max-w-2xl py-50 flex flex-col items-center justify-center text-center space-y-8">
        <h1 className="text-6xl font-bold">
          Reveal your site's secrets with AI
        </h1>
        <h2 className="text-xl font-medium">
          Understand at a glance where your visitors are focusing, why they're clicking (or not), and how to maximize every pixel.
        </h2>
        <div className="flex items-center justify-center space-x-4">
          <Button
            className="cursor-pointer"
            size="lg"
            asChild
          >
            <Link href="mvp">
                <span className="text-sm font-medium">Get Started for Free</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            size="lg"
            asChild
          >
            <Link href="/sign-in">
                <span className="text-sm font-medium">Sign In</span>
            </Link>
          </Button>
        </div>
    </div>
  )
}
