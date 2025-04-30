"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/shadcn-ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  const hundleThemeLight = () => {
    setTheme("light")
  }
  const hundleThemeDark = () => {
    setTheme("dark")
  }
  const hundleThemeSystem = () => {
    setTheme("system")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={hundleThemeLight}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={hundleThemeDark}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={hundleThemeSystem}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
