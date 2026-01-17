// src/components/BlogDetails.tsx

import { useRef } from "react";
import { useBlog } from "@/hooks/useBlog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Share2, Bookmark } from "lucide-react";
import { getCategoryColor } from "@/lib/categoryColors";
import { ReadingProgress } from "./ReadingProgress";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface BlogDetailsProps {
  blogId: number | null;
}

export const BlogDetails = ({ blogId }: BlogDetailsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: blog, isLoading, isError, error } = useBlog(blogId);

  if (!blogId) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Select an article to read
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Choose any blog post from the list to view its full content and details
          </p>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <Skeleton className="w-full h-72 mb-6 rounded-xl" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
        </div>
        <Skeleton className="w-3/4 h-10 mb-3" />
        <Skeleton className="w-1/3 h-5 mb-6" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-5/6 h-4" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-400 font-medium">Error loading blog: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimatedReadTime = Math.ceil(blog.content.split(" ").length / 200);

  const handleShare = () => {
    toast.success("Link copied to clipboard!");
    navigator.clipboard.writeText(window.location.href);
  };

  const handleBookmark = () => {
    toast.success("Article bookmarked!");
  };

  return (
    <>
      <ReadingProgress target={scrollRef} />
      <motion.div 
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-y-auto h-[calc(100vh-200px)]"
      >
        {/* Cover Image */}
        <div className="relative w-full h-80 overflow-hidden flex-shrink-0">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        <div className="p-8">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            {blog.category.map((cat, index) => {
              const colors = getCategoryColor(cat);
              return (
                <span
                  key={index}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md uppercase tracking-wide ${colors.bg} ${colors.text} ${colors.border} border dark:opacity-90`}
                >
                  {cat}
                </span>
              );
            })}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{estimatedReadTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info & Actions */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{estimatedReadTime} Mins</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category and Read Time Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-8 border border-blue-100 dark:border-blue-800">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Category</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{blog.category.join(" & ")}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Read Time</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{estimatedReadTime} Mins</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {blog.description}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.category.map((tag, index) => {
                const colors = getCategoryColor(tag);
                return (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${colors.bg} ${colors.text} ${colors.hover} dark:opacity-90`}
                  >
                    #{tag.toLowerCase()}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};