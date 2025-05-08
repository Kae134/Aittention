import Link from "next/link";
import AppLogo from "@/components/ui/app-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const LINKS = [
    { href: "/", label: "" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 left-0 w-full h-16 px-4 flex items-center justify-between border-b backdrop-blur">
            <nav className="container mx-auto flex items-center justify-between h-full">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <AppLogo className="size-6" />
                        <Link href="/mvp" className="text-lg font-bold uppercase">Aittention</Link>
                    </div>
                    <nav className="flex items-center space-x-4">
                        {LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={`${link.href}`}
                                className="font-bold text-sm opacity-80 hover:opacity-100"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div>
                  <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}