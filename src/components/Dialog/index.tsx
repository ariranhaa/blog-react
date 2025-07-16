"use client";

import clsx from "clsx";

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible = false,
  title,
  content,
  onCancel,
  onConfirm,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;

    onCancel();
  }

  return (
    <div
      className={clsx(
        "fixed z-50 inset-0 bg-black/40 backdrop-blur-xs",
        "flex items-center justify-center"
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          "bg-slate-100 p-6 rounded-lg max-w-2xl mx-6",
          "flex flex-col gap-7",
          "shadow-lg shadow-black/50 text-center"
        )}
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="dialog-title" className="text-xl font-extrabold">
          {title}
        </h3>
        <div id="dialog-description">{content}</div>
        <div className="flex items-center justify-around">
          <button
            className={clsx(
              "bg-slate-300 hover:bg-slate-500 transition text-slate-950 rounded-xl px-4 py-2 cursor-pointer",
              "flex items-center justify-center",
              "disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
            )}
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </button>
          <button
            className={clsx(
              "bg-blue-500 hover:bg-blue-700 transition text-slate-950 rounded-xl px-4 py-2 cursor-pointer",
              "flex items-center justify-center",
              "disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
            )}
            onClick={onConfirm}
            disabled={disabled}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
