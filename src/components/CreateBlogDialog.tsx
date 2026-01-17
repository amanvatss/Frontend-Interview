// src/components/CreateBlogDialog.tsx

import { useState } from "react";
import { useCreateBlog } from "@/hooks/useCreateBlog";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";

export const CreateBlogDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    coverImage: "",
    content: "",
  });

  const { mutate: createBlog, isPending } = useCreateBlog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogData = {
      ...formData,
      category: formData.category.split(",").map((cat) => cat.trim().toUpperCase()),
      date: new Date().toISOString(),
    };

    createBlog(blogData, {
      onSuccess: () => {
        setOpen(false);
        setFormData({
          title: "",
          category: "",
          description: "",
          coverImage: "",
          content: "",
        });
        toast.success("Blog post created successfully!");
      },
      onError: (error) => {
        toast.error(`Failed to create blog: ${error.message}`);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Create New Blog Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto dark:bg-gray-900 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold dark:text-white">Create New Blog Post</DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fill in the details below to publish your article</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title" className="text-sm font-semibold dark:text-gray-200">
                Article Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="e.g., The Future of Fintech in 2024"
                className="mt-1.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-sm font-semibold dark:text-gray-200">
                Categories * (comma-separated)
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
                placeholder="e.g., TECH, FINANCE"
                className="mt-1.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate multiple categories with commas</p>
            </div>

            <div>
              <Label htmlFor="coverImage" className="text-sm font-semibold dark:text-gray-200">
                Cover Image URL *
              </Label>
              <Input
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                required
                placeholder="https://example.com/image.jpg"
                className="mt-1.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-semibold dark:text-gray-200">
              Short Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              placeholder="A brief summary of your article (1-2 sentences)"
              rows={3}
              className="mt-1.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-sm font-semibold dark:text-gray-200">
              Article Content *
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              placeholder="Write your full article content here..."
              rows={12}
              className="mt-1.5 font-mono text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Estimated read time: {Math.ceil(formData.content.split(" ").length / 200)} min
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Publish Article
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};