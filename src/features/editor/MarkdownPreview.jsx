import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { cn } from "../../lib/utils";
import { Badge } from "../../components/ui/Badge";
import { TrendingUp, Briefcase, Clock } from "lucide-react";

export function MarkdownPreview({ post, className }) {
  const {
    title = "Untitled Post",
    experience = "",
    type = "",
    skills = [],
    content = "",
    isActive = true,
  } = post || {};

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-sky-100/50 dark:shadow-none overflow-hidden",
        className,
      )}
    >
      {/* Browser-like header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="flex-1 text-center text-sm text-gray-500 dark:text-gray-400">
          Live Preview
        </span>
      </div>

      <div className="p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {title || "Your Post Title"}
        </h1>

        {/* Overview Card */}
        <div className="bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">Post Overview</h2>
              <p className="text-sky-100 text-sm">
                Everything you need to know about this post
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-sky-100" />
          </div>

          {/* Meta info */}
          <div className="mt-4 flex flex-wrap gap-4">
            {experience && (
              <div className="flex items-center gap-2 text-sm text-sky-100">
                <Clock className="w-4 h-4" />
                <span>{experience}</span>
              </div>
            )}
            {type && (
              <div className="flex items-center gap-2 text-sm text-sky-100">
                <Briefcase className="w-4 h-4" />
                <span>{type}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Markdown Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-5 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 my-4 ml-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 my-4 ml-4 list-decimal">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{children}</span>
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-sky-500 bg-sky-50 dark:bg-sky-900/20 pl-4 py-3 my-4 italic text-gray-700 dark:text-gray-300">
                  {children}
                </blockquote>
              ),
              code: ({ inline, className, children }) => {
                if (inline) {
                  return (
                    <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400">
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                    <code className="font-mono text-sm">{children}</code>
                  </pre>
                );
              },
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-sky-600 dark:text-sky-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900 dark:text-white">
                  {children}
                </strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {content || "*Start writing to see the preview...*"}
          </ReactMarkdown>
        </div>

        {/* Status indicator */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                isActive ? "bg-green-500" : "bg-gray-400",
              )}
            />
            <span className="text-gray-500 dark:text-gray-400">
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
