import { Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-16 border-t flex items-center justify-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="https://github.com/your-repo"
          className="text-muted-foreground"
        >
          <Github size={16} />
        </Link>
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Aittention. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
