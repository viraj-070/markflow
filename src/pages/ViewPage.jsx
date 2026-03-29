import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { MarkdownPreview } from "../features/editor/MarkdownPreview";
import usePostStore from "../store/usePostStore";
import { exportAsJson } from "../utils/markdown";
import { ArrowLeft, Edit, Download, Trash2 } from "lucide-react";

export function ViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, deletePost } = usePostStore();

  const post = getPost(id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Post Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            The post you're looking for doesn't exist or has been deleted.
          </p>
          <Button onClick={() => navigate("/posts")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      deletePost(id);
      navigate("/posts");
    }
  };

  const handleExport = () => {
    exportAsJson(post);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/posts")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {post.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Viewing post preview
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/editor/${id}`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        <MarkdownPreview post={post} />
      </div>
    </div>
  );
}
