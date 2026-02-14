"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function ShareButtonInner() {
  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: "Sokoban Cyber",
        text: "Push boxes to targets! Play Sokoban Cyber on Base.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleShare}
      className="min-h-touch px-4 py-3 rounded-lg font-medium text-cyber-text bg-cyber-bg-secondary border border-cyber-cyan/40 hover:border-cyber-cyan"
      whileTap={{ scale: 0.95 }}
    >
      Share
    </motion.button>
  );
}

export const ShareButton = memo(ShareButtonInner);
