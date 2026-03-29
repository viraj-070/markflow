import React from "react";
import { Button } from "./Button";

export function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
}) {
  React.useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/55"
        onClick={onCancel}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md rounded-2xl border border-sky-100 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Button size="sm" variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            size="sm"
            variant={destructive ? "destructive" : "default"}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
