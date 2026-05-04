import { GraduationCap } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex w-full animate-bubble-in justify-start gap-2.5" aria-label="Assistant is typing">
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground ring-2 ring-primary/15"
        aria-hidden="true"
      >
        <GraduationCap className="h-4 w-4" />
      </div>
      <div className="flex items-center rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 shadow-bubble">
        <div className="dot-bounce flex items-center">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
