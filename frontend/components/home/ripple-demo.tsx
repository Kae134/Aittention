import { Ripple } from "@/components/magicui/ripple";
import { Button } from "@/components/shadcn-ui/button";
import Link from "next/link";


export default function RippleDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
            <Link
                href=""
                className="z-10 whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter"
            >
                Get started!
            </Link>
        <Ripple />
    </div>
  );
}