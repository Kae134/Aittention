'use client' // Error components must be Client Components

import { useEffect } from 'react'

import { Button } from '@/components/shadcn-ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn-ui/alert'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center gap-4 h-screen">
      <h2 className="text-2xl font-bold text-center text-red-500">
        Something went wrong!
      </h2>
      <Alert variant="destructive">
        <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription className="mt-2">
            {error.message || "Une erreur inattendue s'est produite."}
            {error.digest && (
              <div className="mt-2">
                <span className="text-xs font-mono p-1 rounded">
                  ID: {error.digest}
                </span>
              </div>
            )}
          </AlertDescription>
        </Alert>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}