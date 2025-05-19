import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import AppLogo from "@/components/ui/app-logo";
import { Button } from "@/components/shadcn-ui/button";
import RepoStars from "@/components/ui/repo-stars";

const LINKS = [
    { href: "/product", label: "Product" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
];

export default function HomeNavbar() {
    return (
        <header className="sticky top-0 left-0 w-full h-16 px-4 flex items-center justify-between border-b bg-accent/5 backdrop-blur">
            <nav className="container mx-auto flex items-center justify-between h-full">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <AppLogo />
                        <Link href="/" className="text-lg font-bold uppercase">Aittention</Link>
                    </div>
                    <nav className="flex items-center space-x-4">
                        {LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={`${link.href}`}
                                className="font-medium text-sm opacity-80 hover:opacity-100"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center space-x-2">
                    <RepoStars />
                    <ThemeToggle />
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        size="default"
                        asChild
                    >
                        <Link href="/sign-in">
                                Sign In
                        </Link>
                    </Button>
                    <Button
                        variant="default"
                        className="cursor-pointer"
                        asChild
                    >
                        <Link href="/mvp">
                                Get Started for Free
                        </Link>
                    </Button>
                </div>
            </nav>
        </header>
    );
}