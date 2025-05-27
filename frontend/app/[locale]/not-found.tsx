import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>

        <p className="text-lg text-muted-foreground">
          Sorry, we couldn&apos;t find the page you were looking for.
        </p>

        <div className="pt-4">
          <Button asChild size="lg">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
