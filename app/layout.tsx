import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Oswald } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The eFootball World Cup — FIFA World Cup 26™",
  description:
    "The official tournament platform for The eFootball World Cup in the official FIFA World Cup 26™ theme. 4 Nations. 12 Matches. 1 Champion. Live standings, fixtures, stats and trophies.",
  generator: "v0.app",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07080a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${oswald.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
