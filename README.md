# Sokoban Cyber — Base & Farcaster Mini App

Neo-cyber Sokoban puzzle game for [Base App](https://base.org) and [Farcaster](https://farcaster.xyz).

## Features

- 30 levels (tutorial → expert)
- Swipe gestures on mobile
- Keyboard controls (arrow keys, WASD) on desktop
- Undo / Restart / Level select
- Neo-Cyber Warehouse aesthetic
- Farcaster Mini App SDK integration
- Haptic feedback (when supported)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- @farcaster/miniapp-sdk

## Console Warnings (Ethereum / defineProperty)

If you see errors like `Failed to assign ethereum proxy` or `Invalid property descriptor` in the console, they come from **browser extensions** (e.g. MetaMask), not from this app. The Sokoban game runs correctly. To get a clean console, use an incognito window or disable Web3 extensions while developing.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env.local
   # Set NEXT_PUBLIC_APP_URL to your deployed URL (e.g. https://sokoban-cyber.vercel.app)
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

## Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Set `NEXT_PUBLIC_APP_URL` to your Vercel production URL.
3. Turn off **Deployment Protection** (Settings → Deployment Protection → Vercel Authentication off).
4. Go to [Base Build Account Association](https://www.base.dev/preview?tab=account), paste your domain, and get the `accountAssociation` object.
5. Add `accountAssociation` (header, payload, signature) to `farcaster.config.ts`.
6. Deploy and verify at [base.dev/preview](https://base.dev/preview).

## Farcaster Manifest

- Embed validation: https://farcaster.xyz/~/developers/mini-apps/embed
- Manifest guide: https://miniapps.farcaster.xyz/docs/guides/publishing

## Assets

- `public/icon.png` — 1024×1024 (no transparency / white corners)
- `public/hero-image.png` — 1200×630 (cover/embed)
- `public/screenshot-*.png` — 1284×2778 portrait screenshots
