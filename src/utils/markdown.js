/**
 * Default markdown template for new posts
 */
export const defaultMarkdownContent = `## Overview

Write a brief overview of this post here. Describe what readers will learn or what this post is about.

## Requirements

- Requirement 1
- Requirement 2
- Requirement 3

## Key Responsibilities

- Responsibility 1
- Responsibility 2
- Responsibility 3

## What We Offer

- Benefit 1
- Benefit 2
- Benefit 3

> **Note:** Add any important notes or highlights here.

## Additional Information

Add any additional details, links, or resources here.
`;

/**
 * Markdown toolbar actions
 */
export const toolbarActions = [
  {
    id: "heading1",
    label: "H1",
    icon: "Heading1",
    prefix: "# ",
    suffix: "",
    block: true,
  },
  {
    id: "heading2",
    label: "H2",
    icon: "Heading2",
    prefix: "## ",
    suffix: "",
    block: true,
  },
  {
    id: "heading3",
    label: "H3",
    icon: "Heading3",
    prefix: "### ",
    suffix: "",
    block: true,
  },
  {
    id: "bold",
    label: "Bold",
    icon: "Bold",
    prefix: "**",
    suffix: "**",
    block: false,
  },
  {
    id: "italic",
    label: "Italic",
    icon: "Italic",
    prefix: "_",
    suffix: "_",
    block: false,
  },
  {
    id: "underline",
    label: "Underline",
    icon: "Underline",
    prefix: "<u>",
    suffix: "</u>",
    block: false,
  },
  {
    id: "strikethrough",
    label: "Strikethrough",
    icon: "Strikethrough",
    prefix: "~~",
    suffix: "~~",
    block: false,
  },
  {
    id: "bulletList",
    label: "Bullet List",
    icon: "List",
    prefix: "- ",
    suffix: "",
    block: true,
  },
  {
    id: "numberedList",
    label: "Numbered List",
    icon: "ListOrdered",
    prefix: "1. ",
    suffix: "",
    block: true,
  },
  {
    id: "quote",
    label: "Quote",
    icon: "Quote",
    prefix: "> ",
    suffix: "",
    block: true,
  },
  {
    id: "code",
    label: "Inline Code",
    icon: "Code",
    prefix: "`",
    suffix: "`",
    block: false,
  },
  {
    id: "codeBlock",
    label: "Code Block",
    icon: "FileCode",
    prefix: "```\\n",
    suffix: "\\n```",
    block: true,
  },
  {
    id: "link",
    label: "Link",
    icon: "Link",
    prefix: "[",
    suffix: "](url)",
    block: false,
  },
  {
    id: "subscript",
    label: "Subscript",
    icon: "Subscript",
    prefix: "<sub>",
    suffix: "</sub>",
    block: false,
  },
  {
    id: "superscript",
    label: "Superscript",
    icon: "Superscript",
    prefix: "<sup>",
    suffix: "</sup>",
    block: false,
  },
];

/**
 * Apply markdown formatting to selected text
 */
export function applyMarkdownFormat(textarea, action) {
  const { selectionStart, selectionEnd, value } = textarea;
  let selectedText = value.substring(selectionStart, selectionEnd);

  let prefix = action.prefix.replace(/\\n/g, "\n");
  let suffix = action.suffix.replace(/\\n/g, "\n");

  let newText;
  let newCursorPos;

  // For inline formatting, trim the selected text to avoid issues like "**bold **"
  if (!action.block && selectedText) {
    const leadingSpaces = selectedText.match(/^(\s*)/)[1];
    const trailingSpaces = selectedText.match(/(\s*)$/)[1];
    const trimmedText = selectedText.trim();
    
    if (trimmedText) {
      const beforeSelection = value.substring(0, selectionStart);
      const afterSelection = value.substring(selectionEnd);
      
      newText = beforeSelection + leadingSpaces + prefix + trimmedText + suffix + trailingSpaces + afterSelection;
      newCursorPos = selectionStart + leadingSpaces.length + prefix.length + trimmedText.length + suffix.length + trailingSpaces.length;
      
      return {
        text: newText,
        cursorPosition: newCursorPos,
      };
    }
  }

  if (action.block && selectionStart === selectionEnd) {
    const beforeCursor = value.substring(0, selectionStart);
    const afterCursor = value.substring(selectionEnd);
    const needsNewLine =
      beforeCursor.length > 0 && !beforeCursor.endsWith("\n");

    newText =
      beforeCursor + (needsNewLine ? "\n" : "") + prefix + suffix + afterCursor;
    newCursorPos = selectionStart + (needsNewLine ? 1 : 0) + prefix.length;
  } else {
    const beforeSelection = value.substring(0, selectionStart);
    const afterSelection = value.substring(selectionEnd);

    newText = beforeSelection + prefix + selectedText + suffix + afterSelection;
    newCursorPos =
      selectionStart + prefix.length + selectedText.length + suffix.length;
  }

  return {
    text: newText,
    cursorPosition: newCursorPos,
  };
}

/**
 * Generate a unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format date for display
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Export post as JSON
 */
export function exportAsJson(post) {
  const dataStr = JSON.stringify(post, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${post.title.toLowerCase().replace(/\s+/g, "-")}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
