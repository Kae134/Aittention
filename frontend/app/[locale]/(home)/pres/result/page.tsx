"use client"

import ImageReveal from '@/components/ui/image-reveal'

export default function page() {
  return (
    <div className="p-10">
        <div className="max-w-4xl mx-auto">
            <ImageReveal
                firstImage="/site_web_overlay.png"
                secondImage="/site_web.png"
            />
        </div>
    </div>
  )
}
