import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { MarkdownPreview } from "../features/editor/MarkdownPreview";
import usePostStore from "../store/usePostStore";
import { exportAsJson } from "../utils/markdown";
import { ArrowLeft, Edit, Download, Trash2 } from "lucide-react";

export function ViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, deletePost } = usePostStore();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const post = getPost(id);

  if (!post) {
    return (
      <div className="min-h-screen bg-sky-50/40 dark:bg-slate-950 flex items-center justify-center">
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
    deletePost(id);
    setShowDeleteModal(false);
    navigate("/posts");
  };

  const handleExport = () => {
    exportAsJson(post);
  };

  return (
    <div className="min-h-screen bg-sky-50/40 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white/95 dark:bg-slate-900/95 border-b border-sky-100 dark:border-slate-700">
        <div className="pl-16 pr-4 sm:px-4 lg:px-8 py-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={handleExport}
                className="flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/editor/${id}`)}
                className="flex-1 sm:flex-none"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDeleteModal(true)}
                className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20 w-full sm:w-auto"
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

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Post"
        description={`Delete "${post.title}" permanently? This action cannot be undone.`}
        confirmText="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
