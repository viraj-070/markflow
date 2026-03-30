import React, { useRef, useCallback } from "react";
import { cn } from "../../lib/utils";
import { EditorToolbar } from "./EditorToolbar";
import { applyMarkdownFormat } from "../../utils/markdown";

export function MarkdownEditor({ value, onChange, className, placeholder }) {
  const textareaRef = useRef(null);

  const handleToolbarAction = useCallback(
    (action) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Store scroll position
      const scrollTop = textarea.scrollTop;
      
      const result = applyMarkdownFormat(textarea, action);
      onChange(result.text);

      // Restore focus, cursor position, and scroll position
      requestAnimationFrame(() => {
        textarea.focus({ preventScroll: true });
        textarea.setSelectionRange(
          result.cursorPosition,
          result.cursorPosition,
        );
        textarea.scrollTop = scrollTop;
      });
    },
    [onChange],
  );

  const handleKeyDown = (e) => {
    // Handle tab for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      const { selectionStart, selectionEnd, value: currentValue } = textarea;

      const newValue =
        currentValue.substring(0, selectionStart) +
        "  " +
        currentValue.substring(selectionEnd);

      onChange(newValue);

      setTimeout(() => {
        textarea.setSelectionRange(selectionStart + 2, selectionStart + 2);
      }, 0);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden",
        className,
      )}
    >
      <EditorToolbar onAction={handleToolbarAction} />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Write your content in Markdown..."}
        className="flex-1 w-full min-h-[300px] p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 resize-none focus:outline-none font-mono text-sm leading-relaxed"
      />
    </div>
  );
}
