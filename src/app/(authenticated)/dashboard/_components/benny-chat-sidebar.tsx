"use client";

import { useRef, useEffect } from "react";
import { Bot, Send, Square } from "lucide-react";
import { useChatHook } from "./use-chat-hook";
import type { UIMessage } from "@ai-sdk/react";

const QUICK_PROMPTS = [
  "Compare to last July",
  "Burn rate forecast",
  "Verify 1099s",
];

interface BennyChatSidebarProps {
  initialMessages: UIMessage[];
  streamId: string | null;
}

export function BennyChatSidebar({
  initialMessages,
  streamId,
}: BennyChatSidebarProps) {
  const { messages, sendMessage, stop, status } = useChatHook({
    initialMessages,
    streamId,
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef("");

  const isStreaming = status === "streaming" || status === "submitted";
  const canSend = !isStreaming;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const content = text ?? inputRef.current.trim();
    if (!content || isStreaming) return;
    sendMessage(content);
    inputRef.current = "";
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    inputRef.current = e.target.value;
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <aside className="flex w-[400px] shrink-0 flex-col border-r border-border bg-card">
      {/* Sidebar Header */}
      <div className="border-b border-border p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="font-sans text-2xl font-semibold tracking-tight text-foreground">
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
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <Bot className="h-10 w-10 text-muted-foreground/50" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {"Hi! I'm Benny, your AI accountant."}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Ask me anything about your finances, receipts, or compliance.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          const isUser = message.role === "user";
          const textContent = message.parts
            ?.filter(
              (p): p is { type: "text"; text: string } => p.type === "text",
            )
            .map((p) => p.text)
            .join("\n");

          if (!textContent) return null;

          return (
            <ChatBubble
              key={message.id}
              sender={isUser ? "YOU" : "BENNY"}
              align={isUser ? "right" : "left"}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {textContent}
              </p>
            </ChatBubble>
          );
        })}

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
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your books..."
            disabled={isStreaming}
            rows={1}
            className="w-full resize-none rounded-xl border border-border bg-muted py-3 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {isStreaming ? (
            <button
              onClick={stop}
              className="absolute bottom-3 right-3 rounded-lg bg-destructive p-2 text-white shadow-sm transition-transform hover:scale-105"
            >
              <Square className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => handleSend()}
              disabled={!canSend}
              className="absolute bottom-3 right-3 rounded-lg bg-[#fc7136] p-2 text-white shadow-sm transition-transform hover:scale-105 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          )}
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
  align,
  children,
}: {
  sender: string;
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
        {sender}
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
