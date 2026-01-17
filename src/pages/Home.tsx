import { useState, useMemo, useCallback } from "react";
import { BlogList } from "@/components/BlogList";
import { BlogDetails } from "@/components/BlogDetails";
import { CreateBlogDialog } from "@/components/CreateBlogDialog";
import { SearchFilter } from "@/components/SearchFilter";
import { useBlogs } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { debounce } from "@/lib/utils";

export const Home = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [filteredCount, setFilteredCount] = useState(0);

  const { theme, toggleTheme } = useTheme();
  const { data: blogs } = useBlogs();

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 300),
    []
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const availableCategories = useMemo(() => {
    if (!blogs) return [];
    const categories = new Set<string>();
    blogs.forEach((blog) =>
      blog.category.forEach((cat) => categories.add(cat))
    );
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
    setDebouncedSearchTerm("");
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center flex-1"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              CA Monk Blog
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Stay updated with the latest trends in finance, accounting, and career growth
            </p>
          </motion.div>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="dark:border-gray-700"
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* LEFT PANEL */}
          <div className="lg:col-span-2 flex flex-col h-[calc(100vh-180px)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5 relative z-20"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Latest Articles
              </h2>

              {/* NON-SCROLL CONTENT */}
              <CreateBlogDialog />

              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                availableCategories={availableCategories}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
                resultCount={filteredCount}
                totalCount={blogs?.length || 0}
              />
            </motion.div>

            {/* SCROLLABLE BLOG LIST ONLY */}
            <div className="mt-4 flex-1 overflow-y-auto pr-2 relative z-10">
              <BlogList
                onBlogSelect={setSelectedBlogId}
                selectedBlogId={selectedBlogId}
                searchTerm={debouncedSearchTerm}
                selectedCategories={selectedCategories}
                sortBy={sortBy}
                onFilteredCountChange={setFilteredCount}
              />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="h-[calc(100vh-180px)] bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-800 overflow-hidden">
              <BlogDetails blogId={selectedBlogId} />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};