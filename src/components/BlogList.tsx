import { useBlogs } from "@/hooks/useBlogs";
import { BlogCard } from "./BlogCard";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { motion } from "framer-motion";
import { FileText, Filter, Search } from "lucide-react";

interface BlogListProps {
  onBlogSelect: (id: number) => void;
  selectedBlogId: number | null;
  searchTerm: string;
  selectedCategories: string[];
  sortBy: "newest" | "oldest";
  onFilteredCountChange?: (count: number) => void;
}

export const BlogList = ({ 
  onBlogSelect, 
  selectedBlogId,
  searchTerm,
  selectedCategories,
  sortBy,
  onFilteredCountChange 
}: BlogListProps) => {
  const { data: blogs, isLoading, isError, error } = useBlogs();

  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center"
      >
        <div className="text-red-500 text-4xl mb-3">⚠️</div>
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600/80 dark:text-red-400/80 text-sm">
          {error.message}
        </p>
      </motion.div>
    );
  }

  // No Blogs at All
  if (!blogs || blogs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 text-center bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700"
      >
        <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No blogs yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Create your first blog post to get started!
        </p>
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

  // Update filtered count
  if (onFilteredCountChange) {
    onFilteredCountChange(filteredBlogs.length);
  }

  // No Results After Filtering
  if (filteredBlogs.length === 0) {
    const hasSearchTerm = searchTerm.length > 0;
    const hasCategories = selectedCategories.length > 0;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 text-center bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700"
      >
        {hasSearchTerm ? (
          <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        ) : (
          <Filter className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        )}
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No results found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          {hasSearchTerm && hasCategories
            ? `No blogs match "${searchTerm}" in the selected categories`
            : hasSearchTerm
            ? `No blogs match "${searchTerm}"`
            : "No blogs match the selected categories"}
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">
          Try adjusting your filters or search terms
        </p>
      </motion.div>
    );
  }

  // Display Filtered Blogs
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