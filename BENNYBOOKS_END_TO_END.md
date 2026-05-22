# Bennybooks End-to-End Guide

Bennybooks is a fully integrated AI-powered accounting and financial management system for small businesses and entrepreneurs. Benny (powered by TrustClaw + OpenAI GPT-5.5) is your always-on AI accountant that monitors accounts, captures receipts, manages bookkeeping, and provides financial insights.

## Product Architecture

### 1. Authentication & Account Management
- **System**: better-auth + Neon PostgreSQL
- **Features**: 
  - Email/password signup and login
  - Google OAuth (Gmail sign-in)
  - Session management with HTTP-only cookies
  - User timezone support

**How it works**:
1. User signs up at `/login` with email/password or "Continue with Google"
2. Account created in Neon database (`users` table)
3. Session established and redirected to onboarding

### 2. Onboarding Flow
- **Route**: `/dashboard` with onboarding wizard
- **Steps**:
  1. Name your Benny instance
  2. Tell Benny about your business (optional)
  3. Choose AI model (GPT-5.5, GPT-4o, GPT-4o Mini)
  4. Connect integrations (Gmail, Stripe, etc.)

**Output**: Creates `composioClawInstance` in database with:
- AI model selection
- Soul prompt (personalization)
- User ID reference
- Integration connections via Composio

### 3. Benny AI Agent (TrustClaw)
- **Core**: OpenAI GPT-5.5 with 1M token context
- **Tools**: Composio integration (1000+ tools + custom tools)
- **Capabilities**:
  - Email monitoring (Gmail integration)
  - Receipt extraction and categorization
  - Bookkeeping and transaction reconciliation
  - Tax compliance tracking and alerts
  - Financial reporting and analysis
  - Browser automation for financial portals
  - Composio tool ecosystem access

**System Prompt Includes**:
- Benny's accounting identity and capabilities
- Browser use guidelines for navigating financial portals
- Composio tool descriptions for email, Slack, etc.
- Messaging style (clear, financial-focused, actionable)

**How it works**:
1. User sends message in Benny chat sidebar
2. Message sent to `/api/chat` endpoint
3. `prepareAgentRun()` loads instance config + conversation history
4. Agent streams response using AI SDK + ToolLoopAgent
5. Agent can call Composio tools (Gmail, Stripe, browser) as needed
6. Response saved to `messages` table in database
7. UI streams text to user with tool execution status

### 4. Financial Dashboard
- **Location**: Main dashboard view (right side of screen)
- **Metrics**:
  - Cash balance (demo: $432,150)
  - Net margin (34.5%, +21%)
  - Compliance score (98%, 1 alert)
- **Recent Activity**: Table of last 5 transactions with status indicators
- **Performance Chart**: Area chart of monthly revenue vs forecast

**View Ledger Button**: Toggles full-screen transactions ledger

### 5. Transactions Ledger
- **Component**: TanStack Table with advanced features
- **Columns**:
  - Date (sortable)
  - Description
  - Amount (sortable, color-coded)
  - Category (filterable)
  - Type (income/expense/transfer)
  - Status (completed, needs_review, needs_receipt, etc.)
  - Vendor
  - Account
- **Features**:
  - Global search across all fields
  - Filter by status and type
  - Pagination (15 items/page)
  - Sort by date/amount

**Row Interaction**: Click any transaction to open detail panel

### 6. Transaction Detail Panel
- **Type**: Sliding sidebar (animates in from right)
- **Edit Fields**:
  - Description, date, vendor, category
  - Account, status, tags
  - Free-form notes
- **Receipt Upload**: Drag-and-drop zone for file attachments
- **Benny Suggestions**: AI-powered recommendations for the transaction
  - "This expense looks unusual - verify vendor"
  - "Missing receipt - would you like me to email the vendor?"
  - "Not categorized - I'd suggest Software for tools.vercel.com"
- **Actions**: Save, delete, mark as reconciled

### 7. Chat Interface
- **Location**: Left sidebar (400px fixed width)
- **Features**:
  - Benny header with "AI First" badge
  - Real-time message streaming
  - Quick prompts ("Compare to last July", "Burn rate forecast", etc.)
  - Typing indicator when Benny is thinking
  - Stop button to cancel streaming

**Message Format**:
- User messages: Navy blue bubbles on right
- Benny messages: Muted cards on left with tool execution details

### 8. Settings & Configuration
- **Pages**:
  - Model Settings: Change AI model (GPT-5.5 default)
  - Telegram Integration: Connect Telegram for chat via bot
  - Memory Settings: View AI memory and context management
  - Danger Zone: Delete instance
- **Integration Management**: Connect/disconnect Composio tools

---

## End-to-End User Flow

### First Time User
1. Opens https://bennybooks.com
2. Clicks "Get Started" on landing page
3. Directed to signup at `/login`
4. Signs up with email/password or Google
5. Redirected to onboarding
6. Completes 4-step wizard
7. Instance created, Composio tools connected
8. Lands on dashboard

### Regular User
1. Goes to dashboard (auto-redirected from `/`)
2. Left sidebar: Benny chat is ready
3. Right panel: Financial dashboard with metrics
4. Types message: "Show me my largest expenses this month"
5. Benny:
   - Queries transactions via custom tools
   - Fetches Gmail for receipt attachments
   - Uses browser to check bank portal if needed
   - Returns summary with links to details
6. User clicks "View Ledger"
7. Full-screen ledger opens with 50+ transactions
8. User clicks transaction that needs attention
9. Detail panel slides in
10. User uploads receipt image
11. Saves changes

### Email Receipt Capture
1. Benny monitors Gmail inbox (via Composio Gmail tool)
2. Detects receipt emails
3. Extracts PDF attachments or scrapes receipt info
4. Creates transaction with:
   - Vendor from email subject
   - Date from receipt
   - Amount automatically parsed
   - Category inferred
   - Receipt URL/attachment linked
5. Flags as "needs_review" if unusual
6. Alerts user: "New receipt from Stripe - $450 transaction"

### Tax Deadline Alerts
1. Benny tracks known tax deadlines in system prompt
2. Runs periodic checks (via cron or scheduled tasks)
3. Detects approaching deadlines
4. Sends alert to user: "Q3 estimated tax due in 5 days"
5. Provides:
   - Estimated amount based on YTD revenue
   - Link to IRS portal
   - Deductions summary

---

## Technology Stack

### Frontend
- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Tables**: TanStack Table v8 for ledger
- **UI**: shadcn/ui components
- **Animations**: Framer Motion
- **HTTP**: AI SDK React (`useChat` hook)
- **State**: React hooks + tRPC for server state

### Backend
- **Runtime**: Node.js / Edge Functions
- **API**: tRPC with next.js App Router
- **Database**: Neon PostgreSQL (via Prisma ORM)
- **AI**: OpenAI GPT-5.5 via Vercel AI Gateway
- **AI Agent**: `ToolLoopAgent` (AI SDK)
- **Tools**: Composio SDK (1000+ integrations)
- **Auth**: better-auth (sessions + OAuth)
- **Cache**: Redis (via Upstash) for streaming state
- **Streaming**: AI SDK `smoothStream()` for UI message streams

### Infrastructure
- **Hosting**: Vercel (Edge Functions + Serverless)
- **Database**: Neon (Serverless PostgreSQL)
- **Storage**: Vercel Blob (for receipts/attachments)
- **Environment**: Vercel Edge Config for feature flags

---

## Key APIs & Endpoints

### Chat
- `POST /api/chat`: Stream agent response to user message
- Accepts: `{ messages: [{ role, content, parts? }] }`
- Returns: Server-Sent Events stream of UI message parts

### tRPC Procedures (via `/api/trpc`)
- `trustclaw.getHistory`: Load conversation history
- `trustclaw.getStreamingMessage`: Check active stream
- `trustclaw.createInstance`: Setup new Benny agent
- `trustclaw.updateSettings`: Change model/integrations
- `trustclaw.deleteInstance`: Remove instance

### Database Schema
- `User`: Email, password hash, session
- `Session`: Token, user ID, expiry
- `ComposioClawInstance`: Agent config, model, connections
- `Message`: Role, content, tool calls, tokens used
- `Memory`: Long-term context storage
- `Conversation`: Grouped messages

---

## Development & Testing

### Local Setup
```bash
# Install dependencies
pnpm install

# Set env vars (see .env.example)
OPENAI_API_KEY=...
COMPOSIO_API_KEY=...
DATABASE_URL=... (Neon)
BETTER_AUTH_SECRET=... (random string)

# Run dev server
pnpm dev
```

### Test End-to-End
1. Go to http://localhost:3000
2. Signup and onboard
3. Try chat: "What's my cash balance?"
4. Click View Ledger
5. Edit a transaction

### Demo Mode
- Landing page works without auth
- Onboarding uses demo data
- Dashboard shows demo transactions
- Chat uses mock Benny responses (can be toggled)

---

## Production Checklist

- [ ] OpenAI API key configured
- [ ] Composio API key configured
- [ ] Neon database connected
- [ ] Vercel Blob storage configured
- [ ] Google OAuth credentials set up
- [ ] Email domain verified (for transactional emails)
- [ ] SSL certificate configured
- [ ] Rate limiting enabled
- [ ] Error monitoring (Sentry) configured
- [ ] Analytics configured

---

## Security & Privacy

- **Sessions**: HTTP-only cookies, 24h expiry
- **Credentials**: Composio manages OAuth tokens securely
- **API Keys**: Never exposed to frontend, only via secure headers
- **Database**: Encrypted at rest (Neon)
- **Passwords**: bcrypt hashing via better-auth
- **RLS**: Row-level security not yet implemented (TODO)
- **Audit**: All agent actions logged to `Message` table

---

## Future Enhancements

- [ ] Multi-currency support
- [ ] Automated invoice sending
- [ ] Bank feed integration (Plaid)
- [ ] Profit/loss forecasting
- [ ] Team collaboration & permissions
- [ ] Document OCR for receipt scanning
- [ ] Webhook support for real-time updates
- [ ] White-label deployment
- [ ] Mobile app
