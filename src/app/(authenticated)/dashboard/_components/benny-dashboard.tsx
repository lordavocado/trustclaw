"use client";

import type { UIMessage } from "@ai-sdk/react";
import { trpc } from "~/clients/trpc";
import { BennyChatSidebar } from "./benny-chat-sidebar";
import { FinancialDashboard } from "./financial-dashboard";
import { DashboardNavbar } from "./dashboard-top-nav";

export function BennyDashboard() {
  const historyQuery = trpc.trustclaw.getHistory.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const streamingQuery = trpc.trustclaw.getStreamingMessage.useQuery(
    undefined,
    {
      refetchOnWindowFocus: "always",
    },
  );

  const pages = historyQuery.data?.pages ?? [];
  const allHistoryMessages = [...pages].reverse().flatMap((p) => p.messages);

  const initialMessages: UIMessage[] = allHistoryMessages.map((msg) => ({
    id: msg.id,
    role: msg.role,
    parts: msg.content as UIMessage["parts"],
  }));

  const streamId = streamingQuery.data?.messageId ?? null;
  const isLoading = !historyQuery.data || streamingQuery.isLoading;

  return (
    <div className="flex h-full w-full">
      {/* Left: Benny AI Chat Sidebar */}
      <BennyChatSidebar
        initialMessages={initialMessages}
        streamId={streamId}
        isLoading={isLoading}
        historyPageCount={pages.length}
        fetchOlderMessages={() => void historyQuery.fetchNextPage()}
        hasOlderMessages={historyQuery.hasNextPage ?? false}
        isFetchingOlderMessages={historyQuery.isFetchingNextPage}
      />

      {/* Right: Main Dashboard Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <DashboardNavbar />
        <FinancialDashboard />
      </div>
    </div>
  );
}
