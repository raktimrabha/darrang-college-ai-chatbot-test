import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX = 500;
const WARN = 450;
const DANGER = 480;

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function InputBar({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.style.height = "auto";
    const max = 24 * 4 + 24;
    ta.style.height = Math.min(ta.scrollHeight, max) + "px";
  }, [value]);

  useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled]);

  const submit = () => {
    const t = value.trim();
    if (!t || disabled) return;
    onSend(t);
    setValue("");
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="sticky bottom-0 z-20 bg-background/70 backdrop-blur-xl">
      <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="safe-bottom mx-auto max-w-3xl px-4 pt-3 sm:px-6">
        <div
          className={cn(
            "flex items-end gap-2 rounded-2xl border border-border bg-card/90 p-2 shadow-bubble backdrop-blur transition-all",
            "focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-elevated",
          )}
        >
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX))}
            onKeyDown={onKey}
            disabled={disabled}
            rows={1}
            placeholder="Ask about admissions, courses, fees…"
            aria-label="Type your question"
            className="min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-[15px] leading-6 outline-none placeholder:text-muted-foreground disabled:opacity-60"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!canSend}
            aria-label="Send message"
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground transition-all",
              "active:scale-95 disabled:opacity-40 disabled:active:scale-100",
              canSend && "shadow-glow hover:brightness-110",
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="flex h-5 items-center justify-between px-1 pt-1 text-[11px] text-muted-foreground">
          <span className="hidden sm:inline">Press Enter to send · Shift+Enter for newline</span>
          <span className="sm:hidden">Enter to send</span>
          {value.length > WARN && (
            <span
              className={cn(
                value.length >= MAX
                  ? "text-destructive font-medium"
                  : value.length >= DANGER
                    ? "text-destructive/80"
                    : "text-muted-foreground",
              )}
            >
              {value.length} / {MAX}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
