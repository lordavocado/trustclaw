# Bennybooks Component Index

## 🎨 Frontend Components

### Page Components
- **Landing Page** (`src/app/_components/landing-page.tsx`)
  - Hero section with Bennybooks value prop
  - Features showcase (6 accounting capabilities)
  - How It Works (3-step process)
  - Pricing section
  - Security FAQ
  - Testimonials
  - CTA buttons

- **Dashboard** (`src/app/(authenticated)/dashboard/page.tsx`)
  - Protected route with authentication
  - Main layout

- **Login** (`src/app/(authenticated)/auth/login/page.tsx`)
  - Email/password form
  - Google OAuth button
  - Sign up link

### Layout Components
- **BennyDashboard** (`src/app/(authenticated)/dashboard/_components/benny-dashboard.tsx`)
  - Main dashboard layout
  - Sidebar + main content
  - Ledger view toggle
  - Framer Motion animations

- **DashboardNavbar** (`src/app/(authenticated)/dashboard/_components/dashboard-top-nav.tsx`)
  - Navigation links (Dashboard, Compliance, Reports)
  - Search bar
  - Notifications bell
  - Logout button
  - User avatar

### Chat Components
- **BennyChatSidebar** (`src/app/(authenticated)/dashboard/_components/benny-chat-sidebar.tsx`)
  - 400px fixed sidebar
  - Benny header with AI First badge
  - Message display with Virtuoso scroll
  - Real-time message streaming
  - Input textarea with auto-resize
  - Quick prompt buttons
  - Typing indicator
  - Send/Stop buttons

### Financial Dashboard
- **FinancialDashboard** (`src/app/(authenticated)/dashboard/_components/financial-dashboard.tsx`)
  - Key metrics cards (balance, margin, compliance)
  - Performance area chart (Recharts)
  - Recent activity table
  - View Ledger button
  - Attention badge for items needing review

### Transactions Ledger
- **LedgerView** (`src/app/(authenticated)/dashboard/_components/ledger/ledger-view.tsx`)
  - Full-screen modal overlay
  - Combines table + detail panel
  - Animates in/out

- **TransactionsLedger** (`src/app/(authenticated)/dashboard/_components/ledger/transactions-ledger.tsx`)
  - TanStack Table integration
  - 8+ columns (date, description, amount, category, type, status, vendor, account)
  - Global search filter
  - Status filter dropdown
  - Type filter dropdown
  - Sort by date/amount
  - Pagination (15 items/page)
  - Row click handler → opens detail panel

- **TransactionDetailPanel** (`src/app/(authenticated)/dashboard/_components/ledger/transaction-detail-panel.tsx`)
  - Sliding sidebar (animates from right)
  - Editable fields
  - Receipt upload zone
  - Benny AI suggestions
  - Save/Delete buttons
  - Loading states

### Settings Components
- **ModelSettings** (`src/app/(authenticated)/dashboard/settings/_components/model-settings.tsx`)
  - Radio group for model selection
  - Options: GPT-5.5, GPT-4o, GPT-4o-mini
  - Real-time save

- **TelegramSettings** (`src/app/(authenticated)/dashboard/settings/_components/telegram-settings.tsx`)
  - Telegram bot connection
  - Link/unlink buttons
  - Connection status display

- **MemorySettings** (`src/app/(authenticated)/dashboard/settings/_components/memory-settings.tsx`)
  - View AI memory stats
  - Manual memory flush
  - Context window info

- **DangerZone** (`src/app/(authenticated)/dashboard/settings/_components/danger-zone.tsx`)
  - Delete instance button
  - Confirmation dialog
  - Permanent deletion warning

### Onboarding Components
- **Onboarding** (`src/app/(authenticated)/dashboard/_components/onboarding/onboarding.tsx`)
  - Multi-step wizard controller
  - Step state management
  - Loading screen during setup

- **NameStep** (`src/app/(authenticated)/dashboard/_components/onboarding/name-step.tsx`)
  - Text input for Benny name
  - Max 30 characters

- **LoreStep** (`src/app/(authenticated)/dashboard/_components/onboarding/lore-step.tsx`)
  - Textarea for business description
  - Optional field with skip option
  - Max 500 characters

- **ModelStep** (`src/app/(authenticated)/dashboard/_components/onboarding/model-step.tsx`)
  - Radio group for model selection
  - Cards for each model with descriptions

- **IntegrationsStep** (`src/app/(authenticated)/dashboard/_components/onboarding/integrations-step.tsx`)
  - Composio integration selector
  - Multiple tool options (Gmail, Stripe, Slack, etc.)
  - Connect/disconnect UI
  - Loading states

### Utility Components
- **ChatBubble** (in benny-chat-sidebar.tsx)
  - User/Benny message styling
  - Sender label
  - Different colors for left/right align

---

## 🔧 Backend Components

### API Routes
- **POST /api/chat**
  - Accepts messages from frontend
  - Authenticates user
  - Prepares agent
  - Streams SSE response
  - Max duration: 60 seconds

- **GET /api/chat?streamId=***
  - Resume interrupted stream
  - Returns SSE stream

### tRPC Procedures (Procedures in `trustclaw` router)
- **createInstance**
  - Creates ComposioClawInstance
  - Returns instance ID

- **saveOnboardingState**
  - Saves onboarding choices
  - Stores model, soul prompt, identity prompt

- **getHistory**
  - Fetches conversation history
  - Paginated (limit parameter)
  - Returns messages with content

- **getStreamingMessage**
  - Checks active stream ID
  - Returns messageId of current stream

- **updateSettings**
  - Changes model selection
  - Updates instance config

- **deleteInstance**
  - Removes instance from database
  - Cascades to delete messages

### Agent Components
- **prepareAgentRun()** (`src/server/api/routers/trustclaw/agent/setup.ts`)
  - Loads instance config
  - Loads conversation history
  - Prunes context to fit model window
  - Builds system prompt
  - Creates ToolLoopAgent
  - Returns agent ready for streaming

- **buildSystemPrompt()** (`src/server/api/routers/trustclaw/agent/system-prompt.ts`)
  - Builds complete system prompt
  - Includes Benny accounting identity
  - Includes browser use guidelines
  - Includes tool descriptions
  - Includes relevant memories

- **createCustomTools()** (`src/server/api/routers/trustclaw/agent/tools.ts` - needs to be created)
  - Custom tool functions
  - Financial analysis
  - Transaction queries
  - Report generation

### Database (Prisma Models)
- **User**
  - id, email, password, timezone, createdAt, updatedAt

- **Session**
  - id, token, userId, expiresAt, createdAt

- **ComposioClawInstance**
  - id, userId, anthropicModel, soulPrompt, identityPrompt, userPrompt
  - lastCompactionAt, lastCompactionSummary, compactionCount, memoryFlushCount
  - createdAt, updatedAt

- **Message**
  - id, instanceId, role, content (JSON), source, messageType
  - inputTokens, outputTokens, cacheReadTokens, cacheWriteTokens
  - createdAt, updatedAt

- **Memory**
  - id, instanceId, category, content, importance, createdAt, lastAccessedAt

- **Connection**
  - id, instanceId, tool, credentials (encrypted), connectedAt, lastUsedAt

### Client Libraries
- **Composio** (`src/server/clients/composio.ts`)
  - Creates Composio client with API key
  - Uses Vercel provider
  - Provides 1000+ tools

- **Database** (`src/server/clients/db.ts`)
  - Prisma client
  - Database operations

- **Redis** (`src/server/clients/redis.ts`)
  - Upstash Redis client
  - Session/stream caching

- **Auth** (better-auth integration)
  - Session management
  - OAuth with Google
  - Password hashing

---

## 📊 Demo Data

- **Demo Transactions** (`src/app/(authenticated)/dashboard/_components/ledger/demo-data.ts`)
  - 20 realistic transactions
  - Mix of income, expenses, transfers
  - Various statuses (completed, needs_review, needs_receipt)
  - Categories: revenue, payroll, software, office, utilities, etc.
  - Vendors: Stripe, AWS, Slack, Google Cloud, etc.
  - Utility functions for stats calculation

- **Demo Messages** (in benny-chat-sidebar.tsx)
  - Initial empty state message
  - Typing indicator
  - Streaming mock responses

---

## 🎯 Key Integration Points

### AI/LLM Integration
- **Provider**: OpenAI GPT-5.5
- **Model String**: `openai/gpt-5.5`
- **Context Window**: 1,000,000 tokens
- **Used via**: Vercel AI SDK (`ToolLoopAgent`)

### Tool Integration
- **Provider**: Composio SDK
- **Tools**: 1000+ including Gmail, Stripe, Slack, browser automation
- **How**: `session.tools()` fetches all tools
- **Execution**: ToolLoopAgent calls tools during streaming

### Database
- **Provider**: Neon PostgreSQL
- **ORM**: Prisma
- **Connection**: DATABASE_URL environment variable
- **Operations**: CRUD on user, message, memory tables

### Storage
- **File Storage**: Vercel Blob
- **Receipts**: Uploaded files stored in blob
- **Access**: Secure URLs with expiry

### Caching
- **Provider**: Upstash Redis
- **Use**: Session caching, stream state
- **Connection**: REDIS_URL environment variable

---

## 📱 UI Libraries

- **Framework**: React 19 + Next.js 16
- **Styling**: TailwindCSS v4 + custom design tokens
- **Components**: shadcn/ui (30+ components)
- **Tables**: TanStack Table v8
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form (implicit in inputs)
- **HTTP**: AI SDK React (`useChat` hook)

---

## 🔐 Authentication Flow

1. **Landing Page** → Click "Get Started"
2. **Login Page** → Sign up email/password or "Continue with Google"
3. **better-auth** → Creates session, stores user in DB
4. **Redirect** → `/dashboard` (protected route)
5. **Onboarding** → If no instance, show wizard
6. **Dashboard** → Full app access
7. **Settings** → Logout available

---

## 📈 Data Flow Summary

```
User Input
   ↓
Frontend Component (React)
   ↓
API Route (/api/chat) or tRPC procedure
   ↓
Backend Processing (prepareAgentRun, agent streaming)
   ↓
Database Operations (Prisma + Neon)
   ↓
External Services (OpenAI, Composio, Blob)
   ↓
Response Stream (SSE)
   ↓
Frontend Update (useChat hook)
   ↓
UI Re-render
```

---

## 🚀 Deployment

All components are deployed together to Vercel:
- Frontend: Edge Functions + CDN
- Backend: Serverless Functions
- Database: Neon PostgreSQL (external)
- Cache: Upstash Redis (external)
- Storage: Vercel Blob (external)

All communicate via HTTPS with proper authentication.
