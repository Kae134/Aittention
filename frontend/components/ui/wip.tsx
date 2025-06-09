import { RocketIcon } from "@/components/shadcn-ui/rocket";

export default function Wip() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4">
      <h1 className="text-6xl font-bold flex items-center gap-4">
        Work in progress <RocketIcon size={50} />
      </h1>
      <p className="text-lg text-muted-foreground">
        We still spend some brain juice on it.
      </p>
    </div>
  );
}
