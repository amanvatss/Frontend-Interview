import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs";  
import type { Blog } from "@/types/blog";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: Omit<Blog, "id">) => createBlog(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
