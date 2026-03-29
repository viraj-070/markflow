import * as React from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

const Badge = React.forwardRef(
  (
    { className, variant = "default", removable, onRemove, children, ...props },
    ref,
  ) => {
    const variants = {
      default: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      secondary:
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      success:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      warning:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      outline:
        "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  },
);
Badge.displayName = "Badge";

export { Badge };
