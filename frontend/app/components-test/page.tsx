"use client"

import { toast } from "sonner"
import ImageReveal from "@/components/ui/image-reveal"

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
      <ImageReveal
        firstImage="/site_web_overlay.png"
        secondImage="/site_web.png"
      />
    </div>
  )
}
