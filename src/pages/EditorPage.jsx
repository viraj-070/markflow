import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Label } from "../components/ui/Label";
import { Switch } from "../components/ui/Switch";
import { TagInput } from "../components/shared/TagInput";
import { MarkdownEditor } from "../features/editor/MarkdownEditor";
import { MarkdownPreview } from "../features/editor/MarkdownPreview";
import usePostStore from "../store/usePostStore";
import { exportAsJson, defaultMarkdownContent } from "../utils/markdown";
import { Save, X, Download } from "lucide-react";

const postTypes = [
  { value: "article", label: "Article" },
  { value: "tutorial", label: "Tutorial" },
  { value: "guide", label: "Guide" },
  { value: "documentation", label: "Documentation" },
  { value: "announcement", label: "Announcement" },
  { value: "other", label: "Other" },
];

export function EditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createPost, updatePost, getPost } = usePostStore();

  const existingPost = id ? getPost(id) : null;
  const [isSaving, setIsSaving] = useState(false);

  const defaultValues = existingPost || {
    title: "",
    experience: "",
    type: "article",
    skills: [],
    content: defaultMarkdownContent,
    isActive: true,
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const formData = watch();

  const onSubmit = async (data) => {
    setIsSaving(true);

    try {
      if (id && existingPost) {
        updatePost(id, data);
      } else {
        createPost(data);
      }
      navigate("/posts");
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  const handleExport = () => {
    exportAsJson({
      ...formData,
      exportedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {id ? "Edit Post" : "Create New Post"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Create and manage your content with live preview
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSubmit(onSubmit)} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Publish Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: Form */}
          <Card className="p-6 overflow-hidden">
            <form className="space-y-6">
              {/* Header with toggle */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Post Details
                </h2>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {field.value ? "Active" : "Inactive"}
                      </span>
                    </div>
                  )}
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" required>
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Experience/Meta */}
              <div className="space-y-2">
                <Label htmlFor="experience">Meta Information</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 5 min read, Beginner level, etc."
                  {...register("experience")}
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type" required>
                  Post Type
                </Label>
                <Select id="type" {...register("type")}>
                  {postTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Skills/Tags */}
              <div className="space-y-2">
                <Label required>Tags</Label>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Press Enter or comma to add tags..."
                    />
                  )}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Press Enter or comma to add tags. Click X to remove.
                </p>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label required>Content</Label>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: "Content is required" }}
                  render={({ field }) => (
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                      className="min-h-[400px]"
                    />
                  )}
                />
                {errors.content && (
                  <p className="text-sm text-red-500">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </form>
          </Card>

          {/* Right: Preview */}
          <div className="xl:sticky xl:top-24 xl:h-[calc(100vh-120px)]">
            <MarkdownPreview post={formData} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
