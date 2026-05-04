import { Header } from "./Header";
import { ChatWindow } from "./ChatWindow";
import { InputBar } from "./InputBar";
import { useChat } from "@/hooks/useChat";

export function ChatPage() {
  const { messages, isLoading, send, giveFeedback, reset } = useChat();

  return (
    <div className="flex min-h-screen flex-col">
      <Header onClear={reset} hasMessages={messages.length > 0} />
      <main className="flex flex-1 flex-col">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onFeedback={giveFeedback}
          onPickSuggestion={(t) => send(t)}
        />
      </main>
      <InputBar onSend={send} disabled={isLoading} />
    </div>
  );
}
