import React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/Button";
import { toolbarActions } from "../../utils/markdown";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Subscript,
  Superscript,
  Undo,
  Redo,
} from "lucide-react";

const iconMap = {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Subscript,
  Superscript,
};

export function EditorToolbar({ onAction, className }) {
  const groups = [
    ["heading1", "heading2", "heading3"],
    ["bold", "italic", "underline", "strikethrough"],
    ["bulletList", "numberedList", "quote"],
    ["code", "codeBlock"],
    ["link"],
    ["subscript", "superscript"],
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-t-lg",
        className,
      )}
    >
      {groups.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {groupIndex > 0 && (
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
          )}
          {group.map((actionId) => {
            const action = toolbarActions.find((a) => a.id === actionId);
            if (!action) return null;
            const Icon = iconMap[action.icon];
            return (
              <Button
                key={action.id}
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onAction(action)}
                title={action.label}
              >
                {Icon ? (
                  <Icon className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-semibold">{action.label}</span>
                )}
              </Button>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
