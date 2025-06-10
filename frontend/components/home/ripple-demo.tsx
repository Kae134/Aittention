import { Ripple } from "@/components/magicui/ripple";
import Link from "next/link";

export default function RippleDemo() {
  return (
    <Link
      href="/analyze"
      className="z-10 w-full whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter"
    >
      <div className="relative flex h-[630px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background-secondary-gradient">
        Get started!
        <Ripple />
      </div>
    </Link>
  );
}
