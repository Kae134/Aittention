"use client"

import { toast } from "sonner"
import { Button } from "@/components/shadcn-ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export default function SonnerDemo() {

  const handleSuccess = () => {
    toast.success("Success!")
  }
  const handleError = () => {
    toast.error("Error!")
  }
  const handleInfo = () => {
    toast.info("Info!")
  }
  const handleWarning = () => {
    toast.warning("Warning!")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-screen">
      <div className="flex gap-4">
        <Button variant="outline" onClick={handleSuccess}>
          Success
        </Button>
        <Button variant="outline" onClick={handleError}>
          Error
        </Button>
        <Button variant="outline" onClick={handleInfo}>
          Info
        </Button>
        <Button variant="outline" onClick={handleWarning}>
          Warning
        </Button>
      </div>
      <ThemeToggle />
    </div>
  )
}
