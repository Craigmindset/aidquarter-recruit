"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"menu" | "ai">("menu");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi, I’m your AI assistant. Ask me anything about Aidquarters.",
    },
  ]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-8),
          context: { path: pathname || "/" },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data?.error ||
              "Sorry, I’m unable to respond right now. Please try again.",
          },
        ]);
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            String(data?.reply || "").trim() ||
            "Sorry, I’m unable to respond right now. Please try again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network issue detected. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-12 md:bottom-16 right-6 bg-white rounded-2xl shadow-2xl w-80 z-50 overflow-hidden border">
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <h3 className="font-semibold text-base">
              {mode === "menu" ? "Chat With Us" : "Chat with Mani"}
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setMode("menu");
              }}
              className="hover:bg-green-700 p-1 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {mode === "menu" ? (
            <div className="p-4 space-y-3">
              <p className="text-gray-700 text-sm mb-4">
                Choose how you'd like to get in touch with us
              </p>

              <Link
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
              >
                <MessageCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">
                    WhatsApp Chat
                  </p>
                  <p className="text-xs text-gray-600">
                    Chat with our team instantly
                  </p>
                </div>
              </Link>

              <button
                onClick={() => setMode("ai")}
                className="flex items-center gap-3 w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
              >
                <span
                  className="h-5 w-5 flex-shrink-0"
                  style={{
                    WebkitMaskImage: "url(/bot-svgrepo-com.svg)",
                    maskImage: "url(/bot-svgrepo-com.svg)",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    backgroundColor: "#2563eb",
                  }}
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">
                    Chat with Mani
                  </p>
                  <p className="text-xs text-gray-600">Get instant answers</p>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex flex-col h-[360px] md:h-[380px]">
              <div className="px-4 py-2 border-b bg-gray-50">
                <button
                  onClick={() => setMode("menu")}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                {messages.map((m, i) => (
                  <div
                    key={`${m.role}-${i}`}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-1.5 text-xs ${
                        m.role === "user"
                          ? "bg-green-600 text-white"
                          : "bg-white border text-gray-900"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {m.role === "assistant" && (
                          <img
                            src="/bot-svgrepo-com.svg"
                            alt="Mani bot"
                            className="h-4 w-4 mt-0.5 shrink-0"
                          />
                        )}
                        <span>{m.content}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="text-xs text-gray-500 px-1">
                    AI is typing...
                  </div>
                )}
              </div>
              <div className="p-3 border-t bg-white flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-lg px-3 py-1.5 text-xs"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-2 right-3 md:bottom-6 md:right-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-3 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-5 w-5 md:h-5 md:w-5" />
        ) : (
          <MessageCircle className="h-5 w-5 md:h-5 md:w-5" />
        )}
      </button>
    </>
  );
}
