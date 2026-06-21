import { flagUrl } from "@/lib/data";
import { cn } from "@/lib/utils";

interface TeamFlagProps {
  code: string;
  country: string;
  className?: string;
  size?: "w160" | "w320" | "w640";
}

/** Rounded national flag with a subtle ring. */
export function TeamFlag({
  code,
  country,
  className,
  size = "w320",
}: TeamFlagProps) {
  if (country === "TBD" || code === "un") {
    return null;
  }

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-md ring-1 ring-white/15 shadow-lg",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={flagUrl(code, size) || "/placeholder.svg"}
        alt={`${country} flag`}
        className="h-full w-full object-cover"
        loading="lazy"
        crossOrigin="anonymous"
      />
    </span>
  );
}
