import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-sky-500 text-white hover:bg-sky-600 shadow-sm",
      destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
      outline:
        "border border-sky-200 bg-white hover:bg-sky-50 text-sky-700 dark:border-slate-600 dark:bg-slate-800 dark:text-sky-200 dark:hover:bg-slate-700",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
      ghost:
        "hover:bg-sky-50 text-gray-700 dark:hover:bg-slate-800 dark:text-gray-200",
      link: "text-sky-600 underline-offset-4 hover:underline dark:text-sky-400",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6 text-lg",
      icon: "h-9 w-9",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
