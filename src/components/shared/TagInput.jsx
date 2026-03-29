import React, { useState, useRef } from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

export function TagInput({
  value = [],
  onChange,
  placeholder = "Add tags...",
  className,
}) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const tag = inputValue.trim().toUpperCase();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputValue("");
  };

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 p-3 min-h-[44px] rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-transparent cursor-text",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-sky-500 text-white"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(index);
            }}
            className="ml-0.5 rounded-full p-0.5 hover:bg-sky-400 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
    </div>
  );
}
