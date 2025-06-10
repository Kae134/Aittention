import { Alert, AlertTitle, AlertDescription } from "@/components/shadcn-ui/alert";
import { Button } from "@/components/shadcn-ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Alert variant="destructive" className="max-w-md w-full">
        <ShieldAlert className="h-6 w-6 text-destructive" />
        <AlertTitle>Accès refusé</AlertTitle>
        <AlertDescription>
          Vous n&apos;êtes pas autorisé à accéder à cette page.
        </AlertDescription>
        <div className="mt-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <span className="text-destructive">Retour à l&apos;accueil</span>
            </Link>
          </Button>
        </div>
      </Alert>
    </div>
  );
}