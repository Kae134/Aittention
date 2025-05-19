import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/shadcn-ui/button'

export default function HomeHero() {
  return (
      <div className="max-w-2xl py-50 flex flex-col items-center justify-center text-center space-y-8">
        <h1 className="text-6xl font-bold">
          Reveal your site&#39;s secrets with AI
        </h1>
        <h2 className="text-xl font-medium">
          Understand at a glance where your visitors are focusing, why they&#39;re clicking (or not), and how to maximize every pixel.
        </h2>
        <div className="flex items-center justify-center space-x-4">
          <Link href="">
            <Button
              className="cursor-pointer"
              size="lg"
            >
              <span className="text-sm font-medium">Get Started for Free</span>
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="cursor-pointer"
              size="lg"
            >
              <span className="text-sm font-medium">Sign In</span>
            </Button>
          </Link>
        </div>
    </div>
  )
}
