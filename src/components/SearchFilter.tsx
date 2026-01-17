// src/components/SearchFilter.tsx

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, SlidersHorizontal, CheckCheck, XCircle } from "lucide-react";
import { getCategoryColor } from "@/lib/categoryColors";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  availableCategories: string[];
  sortBy: "newest" | "oldest";
  onSortChange: (sort: "newest" | "oldest") => void;
  onClearFilters: () => void;
  resultCount?: number;
  totalCount?: number;
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
  resultCount,
  totalCount,
}: SearchFilterProps) => {
  const hasActiveFilters = searchTerm.length > 0 || selectedCategories.length > 0;

  const handleSelectAll = () => {
    availableCategories.forEach((category) => {
      if (!selectedCategories.includes(category)) {
        onCategoryToggle(category);
      }
    });
  };

  const handleClearCategories = () => {
    selectedCategories.forEach((category) => {
      onCategoryToggle(category);
    });
  };

  const handleRemoveCategory = (category: string) => {
    onCategoryToggle(category);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 dark:bg-gray-800 dark:border-gray-700"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Result Count */}
      {resultCount !== undefined && totalCount !== undefined && (
        <div className="text-xs text-gray-500 dark:text-gray-400 px-1">
          {hasActiveFilters ? (
            <>
              Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{resultCount}</span> of {totalCount} articles
            </>
          ) : (
            <>
              <span className="font-semibold">{totalCount}</span> articles available
            </>
          )}
        </div>
      )}

      {/* Active Filter Chips */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => {
            const colors = getCategoryColor(category);
            return (
              <button
                key={category}
                onClick={() => handleRemoveCategory(category)}
                className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 hover:opacity-80 transition`}
              >
                {category}
                <X className="w-3 h-3" />
              </button>
            );
          })}
        </div>
      )}

      {/* Filter + Sort Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Filter */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <SlidersHorizontal className="w-4 h-4" />
            Filter:
          </span>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 dark:bg-gray-800 dark:border-gray-700"
              >
                Categories
                {selectedCategories.length > 0 && (
                  <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={8}
              className="w-64 p-3 space-y-2 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              {/* Select All / Clear All */}
              <div className="flex gap-2 pb-2 border-b dark:border-gray-700">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAll}
                  disabled={selectedCategories.length === availableCategories.length}
                  className="flex-1 text-xs h-7"
                >
                  <CheckCheck className="w-3 h-3 mr-1" />
                  Select All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCategories}
                  disabled={selectedCategories.length === 0}
                  className="flex-1 text-xs h-7"
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Clear All
                </Button>
              </div>

              {/* Category List */}
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {availableCategories.map((category) => {
                  const isSelected = selectedCategories.includes(category);
                  const colors = getCategoryColor(category);

                  return (
                    <button
                      key={category}
                      onClick={() => onCategoryToggle(category)}
                      className={`w-full flex items-center justify-between rounded px-3 py-2 text-sm transition ${
                        isSelected
                          ? `${colors.bg} ${colors.text}`
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span>{category}</span>
                      {isSelected && <span className="text-sm">✓</span>}
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange("newest")}
            className="text-xs"
          >
            Newest
          </Button>
          <Button
            variant={sortBy === "oldest" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange("oldest")}
            className="text-xs"
          >
            Oldest
          </Button>
        </div>
      </div>

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="w-full text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="w-3 h-3 mr-1" />
          Clear all filters
        </Button>
      )}
    </div>
  );
};