import Link from "next/link";
import { Button } from "@/components/shadcn-ui/button";
import { ChevronLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode}) {

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <Link href="/">
                <Button className="absolute top-4 left-4 cursor-pointer" variant="ghost">
                    <ChevronLeft />
                    Back
                </Button>
            </Link>
            {children}
        </div>
    );
}