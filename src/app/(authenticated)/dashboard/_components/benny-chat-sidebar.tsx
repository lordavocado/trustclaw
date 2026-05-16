"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Bot, Send } from "lucide-react";

const QUICK_PROMPTS = [
  "Compare to last July",
  "Burn rate forecast",
  "Verify 1099s",
];

interface DemoMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  alert?: { title: string; body: string };
  listItems?: string[];
}

const DEMO_MESSAGES: DemoMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Good morning, Director. I've analyzed your recent Stripe payouts. Your revenue is up 12% this week. Would you like a breakdown of the top growth drivers?",
  },
  {
    id: "2",
    role: "user",
    content:
      "Yes, show me the top 3 drivers and check if I have any tax deadlines soon.",
  },
  {
    id: "3",
    role: "assistant",
    content: "Certainly. Here is what's driving your growth:",
    listItems: [
      "New Enterprise Plan (+$12k)",
      "Expansion in EU region (+$8k)",
      "Reduced churn in Tier 2 (+$4k)",
    ],
    alert: {
      title: "Alert",
      body: "Q3 Estimated Tax Payment is due in 2 days ($12,450.00).",
    },
  },
];

export function BennyChatSidebar() {
  const [messages, setMessages] = useState<DemoMessage[]>(DEMO_MESSAGES);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = input.trim().length > 0 && !isStreaming;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = useCallback(
    (text?: string) => {
      const content = text ?? input.trim();
      if (!content || isStreaming) return;

      const userMsg: DemoMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsStreaming(true);

      // Simulate Benny response
      setTimeout(() => {
        const aiMsg: DemoMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: `I'll look into "${content}" right away. Based on your current financials, I can provide a detailed analysis. Let me pull the latest data from your connected accounts.`,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsStreaming(false);
      }, 1500);
    },
    [input, isStreaming],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (index: number) => {
    const baseHour = 9;
    const baseMinute = 12;
    const minute = baseMinute + index * 3;
    const hour = baseHour + Math.floor(minute / 60);
    const m = minute % 60;
    const ampm = hour >= 12 ? "PM" : "AM";
    const h = hour > 12 ? hour - 12 : hour;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  return (
    <aside className="flex w-[400px] shrink-0 flex-col border-r border-border bg-card">
      {/* Sidebar Header */}
      <div className="border-b border-border p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            Bennybooks
          </span>
          <span className="rounded bg-[#a83900]/10 px-2 py-0.5 text-[10px] font-bold uppercase text-[#a83900]">
            AI First
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-primary p-3 text-primary-foreground">
          <Bot className="h-5 w-5 text-[#88deeb]" />
          <div>
            <p className="text-sm font-semibold">Benny AI Assistant</p>
            <p className="text-[10px] opacity-70">
              Always active and ready to analyze
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-scroll flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        {messages.map((message, i) => (
          <ChatBubble
            key={message.id}
            sender={message.role === "user" ? "YOU" : "BENNY"}
            time={formatTime(i)}
            align={message.role === "user" ? "right" : "left"}
          >
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </p>
            {message.listItems && (
              <ul className="mt-3 flex flex-col gap-1 pl-4 text-sm">
                {message.listItems.map((item, j) => (
                  <li key={j} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {message.alert && (
              <div className="mt-4 rounded border-l-4 border-destructive bg-destructive/5 p-3">
                <p className="text-[10px] font-semibold uppercase text-destructive">
                  {message.alert.title}
                </p>
                <p className="text-sm font-medium">{message.alert.body}</p>
              </div>
            )}
          </ChatBubble>
        ))}

        {isStreaming && (
          <div className="flex items-center gap-2 px-1">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
            </div>
            <span className="text-[10px] text-muted-foreground">
              Benny is thinking...
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-border bg-card p-6">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your books..."
            disabled={isStreaming}
            rows={1}
            className="w-full resize-none rounded-xl border border-border bg-muted py-3 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            onClick={() => handleSend()}
            disabled={!canSend}
            className="absolute bottom-3 right-3 rounded-lg bg-[#fc7136] p-2 text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              disabled={isStreaming}
              className="rounded bg-muted px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-accent disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ---- Chat Bubble sub-component ---- */

function ChatBubble({
  sender,
  time,
  align,
  children,
}: {
  sender: string;
  time: string;
  align: "left" | "right";
  children: React.ReactNode;
}) {
  const isUser = align === "right";

  return (
    <div
      className={`flex max-w-[85%] flex-col gap-2 ${isUser ? "self-end" : ""}`}
    >
      <span
        className={`font-mono text-[10px] tracking-wide text-muted-foreground ${isUser ? "text-right" : ""}`}
      >
        {sender} &middot; {time}
      </span>
      <div
        className={
          isUser
            ? "rounded-xl rounded-tr-none bg-primary p-4 text-primary-foreground"
            : "rounded-xl rounded-tl-none border border-border bg-muted p-4"
        }
      >
        {children}
      </div>
    </div>
  );
}
