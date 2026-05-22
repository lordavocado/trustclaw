const CONTEXT_WINDOWS: Record<string, number> = {
  "gpt-5.5": 1_000_000,
  "gpt-4o": 128_000,
  "gpt-4o-mini": 128_000,
};

const DEFAULT_CONTEXT_WINDOW = 128_000;

export function getContextWindow(modelId: string): number {
  return CONTEXT_WINDOWS[modelId] ?? DEFAULT_CONTEXT_WINDOW;
}
