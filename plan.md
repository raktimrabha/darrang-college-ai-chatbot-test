
## Goal
Give the chat a more modern, distinctive look (warmer, more vibrant palette) and tighten interactions — without changing the PRD's structure (header, chat window, suggestion chips, input bar).

## 1. New color palette (src/styles.css)

Move from the current deep navy blue to a **violet → indigo → teal accent** system. Feels more "AI / education" and gives better contrast in both modes.

Light mode:
- Background: very soft lavender-tinted off-white
- Primary: vibrant indigo-violet (`oklch(0.52 0.22 285)`)
- Primary light / accent: soft lilac
- User bubble: indigo-violet gradient (instead of flat)
- Bot bubble: pure white with subtle border + soft shadow
- Accent (teal) for "Helpful", success states
- Gradient bg: dual radial — violet top-left, teal top-right at very low opacity

Dark mode:
- Background: deep slate-violet (`oklch(0.16 0.025 275)`)
- Card / bot bubble: slightly lifted slate (`oklch(0.21 0.03 275)`)
- Primary: bright violet (`oklch(0.7 0.2 285)`)
- User bubble: violet→indigo gradient
- Borders: low-opacity white
- Gradient bg: violet glow top, faint teal bottom-right

Update `--gradient-primary` to a 3-stop violet→indigo gradient and add a new `--gradient-user` token used by user bubbles.

## 2. UI/UX polish

**Header (Header.tsx)**
- Replace text "Powered by AI" badge with a small pill (rounded-full, accent bg, dot indicator) — feels more product-like.
- Add subtle online "● Online" green dot.
- Theme toggle and Clear button get matching `size="icon"` ghost styling on mobile (icon-only) to save space at 634px viewport.

**ChatWindow empty state**
- Larger, gradient-filled logo tile with soft glow ring.
- Add 2-line tagline + a small "Try asking…" label above suggestion chips.
- Suggestions: show as a 2-column grid on ≥sm (cards w/ icon + text) instead of a single horizontal scroll row, which feels more inviting on first load. Keep horizontal scroll fallback on mobile.

**SuggestionChips**
- Add a small leading icon per suggestion (mapped: GraduationCap, Calendar, BookOpen, Wallet, Home).
- Hover: lift (translate-y, stronger shadow), border becomes primary.

**MessageBubble**
- User bubble uses `--gradient-user` instead of flat color, with subtle inner highlight.
- Bot bubble: tighter padding, slightly larger radius, hairline border in dark mode.
- Feedback buttons: only fade in on hover/focus of the bubble (cleaner timeline), still always visible on touch devices via `@media (hover: none)`.
- Add copy-to-clipboard icon button next to thumbs (small UX win, matches modern chat apps).
- Avatar gets a soft ring matching primary at 20% opacity.

**TypingIndicator**
- Dots use primary color instead of muted, slightly larger, smoother easing.

**InputBar**
- Replace flat send button with gradient + subtle glow when input has text.
- Focus ring uses new primary color.
- Add a thin gradient divider line above the input (separates from chat area more elegantly than the current border).
- Char counter only appears at >450 chars, turns amber at 480, red at 500.

**Global**
- Smooth scroll behavior on chat container.
- Selection color tinted with primary.
- Reduce-motion media query disables bubble-in animation.

## 3. Files to edit
- `src/styles.css` — new color tokens (light + dark), new gradients, selection color, reduced-motion rule.
- `src/components/chat/Header.tsx` — status pill, icon-only buttons on mobile.
- `src/components/chat/ChatWindow.tsx` — refreshed empty state, "Try asking…" label.
- `src/components/chat/SuggestionChips.tsx` — icon + grid layout, hover lift.
- `src/components/chat/MessageBubble.tsx` — gradient user bubble, copy button, hover-revealed actions.
- `src/components/chat/TypingIndicator.tsx` — primary-colored dots.
- `src/components/chat/InputBar.tsx` — gradient send button, glow, refined counter.

No changes to `useChat.ts`, `api.ts`, routing, or overall component structure.

Approve and I'll implement.
