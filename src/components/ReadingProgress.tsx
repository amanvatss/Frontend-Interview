// src/components/ReadingProgress.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ReadingProgressProps {
  target: React.RefObject<HTMLDivElement | null>;
}

export const ReadingProgress = ({ target }: ReadingProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!target.current) return;

      const element = target.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const scrolled = element.scrollTop;
      const progress = (scrolled / totalHeight) * 100;
      
      setProgress(Math.min(Math.max(progress, 0), 100));
    };

    const element = target.current;
    if (element) {
      element.addEventListener("scroll", updateProgress);
      return () => element.removeEventListener("scroll", updateProgress);
    }
  }, [target]);

  return (
    <div className="sticky top-0 z-50 h-1 bg-gray-200 dark:bg-gray-700">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};