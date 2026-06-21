"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Trophy, X } from "lucide-react";
import { NavLinks } from "@/components/site-nav";
import { cn } from "@/lib/utils";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <img src="/logo.png" alt="FIFA 26 Logo" className="w-12 h-12 object-contain transition-transform group-hover:-translate-y-1 group-hover:scale-105" />

      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="font-heading text-lg font-bold uppercase tracking-wider text-foreground">
            FIFA 26™
          </span>
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.25em] text-gold">
            eFootball World Cup
          </span>
        </div>
      )}
    </Link>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Transition Loader State
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState("");

  useEffect(() => {
    // Whenever pathname changes, trigger broadcast-style transition loading screen
    setIsTransitioning(true);
    const routeName =
      pathname === "/" ? "HOME" : pathname.replace("/", "").toUpperCase();
    setTransitionLabel(`ENTERING ${routeName}...`);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Transition sweep length

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Broadcast Transition Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center transition-all duration-300",
          isTransitioning
            ? "opacity-100 bg-background/80"
            : "opacity-0 pointer-events-none delay-100",
        )}
      >
        {/* Sweep background */}
        <div
          className={cn(
            "absolute inset-0 bg-background transition-transform duration-700 ease-in-out",
            isTransitioning ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-card to-background opacity-95" />
          <div className="absolute -inset-[50%] bg-[linear-gradient(45deg,transparent_40%,var(--canada-red)_45%,var(--mexico-green)_50%,var(--usa-blue)_55%,transparent_60%)] opacity-15 blur-3xl animate-light-sweep" />
        </div>

        {/* Dynamic content */}
        <div
          className={cn(
            "relative z-10 flex flex-col items-center gap-4 transition-all duration-500",
            isTransitioning
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4",
          )}
        >
          <div className="relative flex items-center justify-center w-32 h-32 border-8 border-white bg-black overflow-hidden shadow-[12px_12px_0px_0px_var(--neon-purple)]">
            <img src="/logo.png" alt="FIFA 26 Logo" className="w-20 h-20 object-contain animate-pulse" />
          </div>
          <span className="font-heading text-xl font-black uppercase tracking-[0.25em] text-[var(--neon-cyan)] bg-black px-4 py-2 border-4 border-white mt-4">
            {transitionLabel}
          </span>
        </div>
      </div>

      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-background"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04] blur-[3px]"
          style={{ backgroundImage: "url(/images/stadium-night.png)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,var(--background)_75%)]" />
        {/* Ambient colored spots for host countries */}
        <div className="absolute top-0 left-1/4 h-[35rem] w-[35rem] bg-usa-blue/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 h-[35rem] w-[35rem] bg-mexico-green/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] bg-canada-red/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r-4 border-white bg-black lg:flex">
        <div className="flex h-20 items-center px-6 border-b-4 border-white">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Tournament
          </p>
          <NavLinks />
        </div>
        <div className="border-t-4 border-white p-4">
          <div className="maximalist-card p-4">
            <p className="font-heading text-sm font-black uppercase tracking-wide text-white">
              FIFA World Cup 26™
            </p>
            <p className="mt-2 text-xs font-bold text-white uppercase">
              3 Hosts &middot; 4 Nations &middot; 1 Champion
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b-4 border-white bg-black px-4 lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center border-4 border-white bg-black text-white hover:bg-white hover:text-black transition-colors"
        >
          {open ? (
            <X className="size-6 font-bold" />
          ) : (
            <Menu className="size-6 font-bold" />
          )}
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-30 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/90 backdrop-blur-none transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute right-0 top-16 w-72 max-w-[80%] origin-top-right border-l-4 border-b-4 border-white bg-black p-4 transition-transform",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      </div>

      {/* Main content */}
      <main className="lg:pl-64 min-h-screen pb-16">{children}</main>
    </div>
  );
}
