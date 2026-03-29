import React from "react";
import { useForm, Controller } from "react-hook-form";
import { cn } from "../../lib/utils";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Label } from "../../components/ui/Label";
import { Switch } from "../../components/ui/Switch";
import { TagInput } from "../../components/shared/TagInput";
import { MarkdownEditor } from "./MarkdownEditor";
import { defaultMarkdownContent } from "../../utils/markdown";

const postTypes = [
  { value: "article", label: "Article" },
  { value: "tutorial", label: "Tutorial" },
  { value: "guide", label: "Guide" },
  { value: "documentation", label: "Documentation" },
  { value: "announcement", label: "Announcement" },
  { value: "other", label: "Other" },
];

export function PostForm({ defaultValues, onSubmit, onChange, className }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      experience: "",
      type: "article",
      skills: [],
      content: defaultMarkdownContent,
      isActive: true,
      ...defaultValues,
    },
  });

  // Watch all fields and call onChange when they change
  React.useEffect(() => {
    const subscription = watch((data) => {
      onChange?.(data);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-6", className)}
    >
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
              <Switch checked={field.value} onCheckedChange={field.onChange} />
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
          rules={{ required: "At least one tag is required" }}
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
        {errors.skills && (
          <p className="text-sm text-red-500">{errors.skills.message}</p>
        )}
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
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>
    </form>
  );
}
