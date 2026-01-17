// src/pages/Home.tsx

import { useState, useMemo } from "react";
import { BlogList } from "@/components/BlogList";
import { BlogDetails } from "@/components/BlogDetails";
import { CreateBlogDialog } from "@/components/CreateBlogDialog";
import { SearchFilter } from "@/components/SearchFilter";
import { useBlogs } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

export const Home = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const { theme, toggleTheme } = useTheme();
  const { data: blogs } = useBlogs();

  // Get unique categories
  const availableCategories = useMemo(() => {
    if (!blogs) return [];
    const categories = new Set<string>();
    blogs.forEach((blog) => blog.category.forEach((cat) => categories.add(cat)));
    return Array.from(categories).sort();
  }, [blogs]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center flex-1"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                CA Monk Blog
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with the latest trends in finance, accounting, and career growth
              </p>
            </motion.div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="ml-4 dark:border-gray-700"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel - Blog List (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
              </div>
              
              <CreateBlogDialog />
              
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                availableCategories={availableCategories}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
              />
              
              <div className="space-y-4 max-h-[calc(100vh-480px)] overflow-y-auto pr-2">
                <BlogList
                  onBlogSelect={setSelectedBlogId}
                  selectedBlogId={selectedBlogId}
                  searchTerm={searchTerm}
                  selectedCategories={selectedCategories}
                  sortBy={sortBy}
                />
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Blog Details (3 columns) */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 h-[calc(100vh-200px)] overflow-hidden flex flex-col transition-colors duration-300">
              <BlogDetails blogId={selectedBlogId} />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};