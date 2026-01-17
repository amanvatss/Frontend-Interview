// src/components/BlogList.tsx

import { useBlogs } from "@/hooks/useBlogs";
import { BlogCard } from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface BlogListProps {
  onBlogSelect: (id: number) => void;
  selectedBlogId: number | null;
  searchTerm: string;
  selectedCategories: string[];
  sortBy: "newest" | "oldest";
}

export const BlogList = ({ 
  onBlogSelect, 
  selectedBlogId,
  searchTerm,
  selectedCategories,
  sortBy 
}: BlogListProps) => {
  const { data: blogs, isLoading, isError, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border rounded-lg dark:border-gray-700">
            <Skeleton className="w-24 h-6 mb-2" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-400">Error: {error.message}</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 text-center"
      >
        <p className="text-gray-500 dark:text-gray-400">No blogs found. Create your first blog!</p>
      </motion.div>
    );
  }

  // Filter blogs
  let filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      searchTerm === "" ||
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      blog.category.some((cat) => selectedCategories.includes(cat));

    return matchesSearch && matchesCategory;
  });

  // Sort blogs
  filteredBlogs = [...filteredBlogs].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  if (filteredBlogs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 text-center"
      >
        <p className="text-gray-500 dark:text-gray-400">No blogs match your filters.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredBlogs.map((blog, index) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onClick={() => onBlogSelect(blog.id)}
          isSelected={selectedBlogId === blog.id}
          index={index}
        />
      ))}
    </div>
  );
};