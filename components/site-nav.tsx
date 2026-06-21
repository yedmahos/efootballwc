"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  Home,
  ListOrdered,
  Trophy,
  Users,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/fixtures", label: "Fixtures", icon: CalendarDays },
  { href: "/standings", label: "Standings", icon: ListOrdered },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/statistics", label: "Statistics", icon: BarChart3 },
];

export function NavLinks({
  orientation = "vertical",
  onNavigate,
}: {
  orientation?: "vertical" | "horizontal";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex gap-1",
        orientation === "vertical" ? "flex-col" : "flex-row items-center",
      )}
    >
      {navItems.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase transition-all border-4",
              active
                ? "bg-[var(--neon-purple)] border-[var(--neon-purple)] text-black"
                : "bg-black border-transparent text-white hover:border-white hover:bg-white hover:text-black",
            )}
          >
            <Icon
              className={cn(
                "size-5 shrink-0 transition-colors",
                active ? "text-black" : "text-white group-hover:text-black",
              )}
            />
            <span className="tracking-widest">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
