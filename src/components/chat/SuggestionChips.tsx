import { GraduationCap, Calendar, BookOpen, Wallet, Home, type LucideIcon } from "lucide-react";

type Suggestion = { text: string; icon: LucideIcon };

const SUGGESTIONS: Suggestion[] = [
  { text: "What are the admission requirements?", icon: GraduationCap },
  { text: "When is the application deadline?", icon: Calendar },
  { text: "What courses are offered?", icon: BookOpen },
  { text: "What is the fee structure?", icon: Wallet },
  { text: "How do I apply for hostel?", icon: Home },
];

type Props = { onPick: (text: string) => void; disabled?: boolean };

export function SuggestionChips({ onPick, disabled }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {SUGGESTIONS.map(({ text, icon: Icon }) => (
        <button
          key={text}
          type="button"
          onClick={() => onPick(text)}
          disabled={disabled}
          className="group flex items-center gap-3 rounded-xl border border-border bg-card/80 px-3.5 py-3 text-left text-[13px] text-foreground shadow-bubble backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-elevated disabled:opacity-50 disabled:hover:translate-y-0"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
            <Icon className="h-4 w-4" />
          </span>
          <span className="leading-snug">{text}</span>
        </button>
      ))}
    </div>
  );
}
