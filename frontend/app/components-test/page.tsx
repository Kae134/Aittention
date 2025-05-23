"use client"
import ImageReveal from "@/components/ui/image-reveal"

export default function SonnerDemo() {



  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-screen">
      <ImageReveal
        firstImage="/site_web_overlay.png"
        secondImage="/site_web.png"
      />
    </div>
  )
}
