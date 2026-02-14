const ROOT_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://sokoban-kappa.vercel.app");

export const farcasterConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjI3ODYzMjksInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgxNTBEMTk0QUM4OGFkM2M4OGRjNmE4MzBEYjZCMzQ2ODZCMTlmMjRkIn0",
    payload: "eyJkb21haW4iOiJzb2tvYmFuLWthcHBhLnZlcmNlbC5hcHAifQ",
    signature: "IZXCFuXcaE/HwY5az7drzbM895qb38L0zNeiYjG+2xQH6R5RWlDPjJnsDcUFszRa7ooj9f8yinwKyKcestEfWhw=",
  },
  miniapp: {
    version: "1",
    name: "Sokoban Cyber",
    subtitle: "Neo-cyber warehouse puzzle",
    description: "Push boxes to targets in this futuristic Sokoban puzzle. Swipe to move and solve 30 levels.",
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
    ogTitle: "Sokoban Cyber Mini App",
    ogDescription: "Futuristic Sokoban puzzle game for Base and Farcaster",
    ogImageUrl: `${ROOT_URL}/hero-image.png`,
    noindex: false,
  },
} as const;
