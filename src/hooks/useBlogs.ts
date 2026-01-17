import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/api/blogs";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
};