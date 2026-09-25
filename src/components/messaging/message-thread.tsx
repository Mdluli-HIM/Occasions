"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { apiClient, type Message } from "@/lib/api";

export function MessageThread({
  leadId,
  messagesEndpoint,
  currentSender,
}: {
  leadId: string;
  messagesEndpoint: string;
  currentSender: "customer" | "provider";
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  async function load() {
    try {
      const data = await apiClient<Message[]>(messagesEndpoint);
      setMessages(data);
    } catch {
      // Silently ignore — next poll will retry.
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 8000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function handleSend() {
    const body = draft.trim();
    if (!body || sending) return;

    setSending(true);
    setDraft("");

    try {
      const message = await apiClient<Message>(messagesEndpoint, {
        method: "POST",
        body: { body },
      });
      setMessages((current) => [...current, message]);
    } catch {
      setDraft(body);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto p-1">
        {!loaded ? (
          <p className="py-6 text-center text-sm font-bold text-[#9aa4b5]">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="py-6 text-center text-sm font-bold text-[#9aa4b5]">
            No messages yet — say hello.
          </p>
        ) : (
          messages.map((message) => {
            const isMine = message.sender === currentSender;
            return (
              <div
                key={message.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-[16px] px-4 py-2.5 text-sm font-semibold leading-6 ${
                    isMine
                      ? "bg-[#ff5a40] text-white"
                      : "bg-[#f6f6f4] text-[#111111]"
                  }`}
                >
                  {message.body}
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-[#eee8e3] pt-3">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="min-h-[46px] flex-1 rounded-[14px] border border-[#deded9] bg-white px-4 text-sm font-bold outline-none focus:border-[#ff5a40]"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={sending || !draft.trim()}
          className="flex size-[46px] shrink-0 items-center justify-center rounded-[14px] bg-[#ff5a40] text-white transition hover:bg-[#111111] disabled:opacity-50"
          aria-label="Send message"
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
}
