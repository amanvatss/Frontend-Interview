import { useQuery } from "@tanstack/react-query";
import { fetchBlogById } from "@/api/blogs";

export const useBlog = (id: number | null) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });
};