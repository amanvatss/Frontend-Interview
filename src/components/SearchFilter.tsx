// src/components/SearchFilter.tsx

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { getCategoryColor } from "@/lib/categoryColors";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  availableCategories: string[];
  sortBy: "newest" | "oldest";
  onSortChange: (sort: "newest" | "oldest") => void;
  onClearFilters: () => void;
}

export const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  availableCategories,
  sortBy,
  onSortChange,
  onClearFilters,
}: SearchFilterProps) => {
  const hasActiveFilters = searchTerm || selectedCategories.length > 0;

  return (
    <div className="space-y-4 mb-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-medium">Filter:</span>
        </div>
        
        {availableCategories.map((category) => {
          const colors = getCategoryColor(category);
          const isSelected = selectedCategories.includes(category);
          
          return (
            <button
              key={category}
              onClick={() => onCategoryToggle(category)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${
                isSelected
                  ? `${colors.bg} ${colors.text} ${colors.border} ring-2 ring-offset-1 ring-current`
                  : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
              }`}
            >
              {category}
            </button>
          );
        })}

        {/* Sort Buttons */}
        <div className="ml-auto flex gap-1">
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange("newest")}
            className={`text-xs ${sortBy === "newest" ? "bg-blue-600 hover:bg-blue-700" : "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"}`}
          >
            Newest
          </Button>
          <Button
            variant={sortBy === "oldest" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange("oldest")}
            className={`text-xs ${sortBy === "oldest" ? "bg-blue-600 hover:bg-blue-700" : "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"}`}
          >
            Oldest
          </Button>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="w-full text-xs dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
        >
          <X className="w-3 h-3 mr-1" />
          Clear all filters
        </Button>
      )}
    </div>
  );
};