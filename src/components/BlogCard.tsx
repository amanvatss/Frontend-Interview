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
    const diffDays = Math.floor(
      Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card
        onClick={onClick}
        className={`cursor-pointer transition-all duration-200 border-l-4 ${
          isSelected
            ? "border-l-blue-600 ring-2 ring-blue-500/20 shadow-lg"
            : `${colors.border} hover:border-l-blue-400 dark:bg-gray-800 dark:border-gray-700`
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between mb-2">
            {/* Category badges */}
            <div className="flex gap-1.5 flex-wrap max-w-[85%]">
              {blog.category.slice(0, 2).map((cat) => {
                const catColors = getCategoryColor(cat);
                return (
                  <span
                    key={cat}
                    className={`px-2 py-0.5 text-xs font-medium rounded border ${catColors.bg} ${catColors.text} ${catColors.border}`}
                  >
                    {cat}
                  </span>
                );
              })}
              {blog.category.length > 2 && (
                <span className="text-xs text-gray-400">
                  +{blog.category.length - 2}
                </span>
              )}
            </div>

            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>

          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
            {blog.title}
          </h3>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {blog.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-2 border-t dark:border-gray-700">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Featured
            </span>
            <span>{formatDate(blog.date)}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
