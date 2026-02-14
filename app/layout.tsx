import type { Metadata } from "next";
import { farcasterConfig } from "../farcaster.config";
import { GameProvider } from "@/context/GameProvider";
import { FarcasterReady } from "@/components/FarcasterReady";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://sokoban-kappa.vercel.app";

export const metadata: Metadata = {
  title: farcasterConfig.miniapp.name,
  description: farcasterConfig.miniapp.description,
  other: {
    "base:app_id": "69903f22e0d5d2cf831b5ba2",
    "fc:frame": JSON.stringify({
      version: farcasterConfig.miniapp.version,
      imageUrl: farcasterConfig.miniapp.heroImageUrl,
      button: {
        title: "Play Sokoban",
        action: {
          type: "launch_frame",
          name: farcasterConfig.miniapp.name,
          url: APP_URL,
          splashImageUrl: farcasterConfig.miniapp.splashImageUrl,
          splashBackgroundColor: "#0a0e1a",
        },
      },
    }),
    "fc:miniapp": JSON.stringify({
      version: farcasterConfig.miniapp.version,
      imageUrl: farcasterConfig.miniapp.heroImageUrl,
      button: {
        title: "Play Sokoban",
        action: {
          type: "launch_frame",
          name: farcasterConfig.miniapp.name,
          url: APP_URL,
          splashImageUrl: farcasterConfig.miniapp.splashImageUrl,
          splashBackgroundColor: "#0a0e1a",
        },
      },
    }),
  },
  openGraph: {
    title: farcasterConfig.miniapp.ogTitle,
    description: farcasterConfig.miniapp.ogDescription,
    images: [{ url: farcasterConfig.miniapp.ogImageUrl, width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <FarcasterReady />
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
