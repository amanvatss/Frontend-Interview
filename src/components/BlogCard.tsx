// src/components/BlogCard.tsx

import type { Blog } from "@/types/blog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, TrendingUp } from "lucide-react";
import { getCategoryColor } from "@/lib/categoryColors";
import { motion } from "framer-motion";

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
  isSelected: boolean;
  index: number;
}

export const BlogCard = ({ blog, onClick, isSelected, index }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const primaryCategory = blog.category[0] || "TECH";
  const colors = getCategoryColor(primaryCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`cursor-pointer transition-all duration-200 border-l-4 group ${
          isSelected 
            ? `border-l-blue-600 shadow-xl ring-2 ring-blue-500/20 dark:shadow-blue-500/10` 
            : `${colors.border} hover:border-l-blue-400 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700`
        }`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-wrap gap-1.5">
              {blog.category.slice(0, 2).map((cat, idx) => {
                const catColors = getCategoryColor(cat);
                return (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 text-xs font-medium rounded border ${catColors.bg} ${catColors.text} ${catColors.border} dark:opacity-90`}
                  >
                    {cat}
                  </span>
                );
              })}
            </div>
            <Calendar className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {blog.title}
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {blog.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            <span className="flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Featured
            </span>
            <span>{formatDate(blog.date)}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};