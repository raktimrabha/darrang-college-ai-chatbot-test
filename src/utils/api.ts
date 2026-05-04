const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export type ChatHistoryItem = { role: "user" | "assistant"; content: string };

export async function sendChatMessage(
  message: string,
  history: ChatHistoryItem[],
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
    signal,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Request failed");
  }

  const data = (await res.json()) as { reply: string };
  return data.reply;
}
