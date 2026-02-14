const ROOT_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://sokoban-kappa.vercel.app");

export const farcasterConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: "",
  },
  miniapp: {
    version: "1",
    name: "Sokoban Cyber",
    subtitle: "Neo-cyber warehouse puzzle game",
    description: "Push boxes to targets in this futuristic Sokoban puzzle. Swipe to move, solve 30+ levels.",
    screenshotUrls: [
      `${ROOT_URL}/screenshot-1.png`,
      `${ROOT_URL}/screenshot-2.png`,
      `${ROOT_URL}/screenshot-3.png`,
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/hero-image.png`,
    splashBackgroundColor: "#0a0e1a",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["puzzle", "sokoban", "game", "cyberpunk", "brain-teaser"],
    heroImageUrl: `${ROOT_URL}/hero-image.png`,
    tagline: "Push. Solve. Prevail.",
    ogTitle: "Sokoban Cyber | Mini App",
    ogDescription: "Futuristic Sokoban puzzle game for Base & Farcaster",
    ogImageUrl: `${ROOT_URL}/hero-image.png`,
  },
} as const;
