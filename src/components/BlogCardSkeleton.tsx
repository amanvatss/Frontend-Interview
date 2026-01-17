import { Skeleton } from "@/components/ui/skeleton";

export const BlogCardSkeleton = () => {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Categories */}
      <div className="flex gap-2 mb-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      {/* Title */}
      <Skeleton className="h-6 w-3/4 mb-2" />

      {/* Description */}
      <div className="space-y-2 mb-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
};