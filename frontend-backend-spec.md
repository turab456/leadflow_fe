# LeadFlow Frontend Implementation and Backend Integration Specification

## 1. Overview

LeadFlow is a React-based lead management dashboard built with Vite, Tailwind CSS, and client-side state management. This document describes the frontend architecture, page flow, data models, and backend API requirements needed to support the app.

### 1.1 Technology stack
- React 18
- Vite
- Tailwind CSS
- Lucide icons
- Recharts
- React Joyride
- Client-side context providers for global app state, onboarding, and auth

### 1.2 Goals
- Provide a secure authentication gateway
- Support lead discovery, website audits, campaign management, and analytics
- Persist user session and data through a backend API
- Track onboarding progress and task completion
- Keep frontend styling and interactions consistent with the existing LeadFlow UI

## 2. Frontend Architecture

### 2.1 Context providers
- `AppContext` — manages application data: leads, audits, campaigns, notifications, activities, KPIs, and search state.
- `OnboardingContext` — tracks onboarding state, completed tasks, tour progress, and toast notifications.
- `AuthContext` — handles user authentication, signup, login, logout, password reset, and session persistence.

### 2.2 Main application flow
- `src/App.jsx` is the root application entry.
- Application renders `AuthPage` when user is not authenticated.
- When authenticated, the app renders the sidebar, header, and current page content.
- Onboarding and tour UI render only after the user is authenticated.

### 2.3 Routing
- The current application uses internal state for page navigation rather than React Router.
- The sidebar controls page selection via `currentTab` state.
- Backend integration can keep the current approach or migrate to route-based navigation.

## 3. Pages and Components

### 3.1 Pages
- `Dashboard.jsx` — main dashboard, KPI cards, charts, featured opportunities.
- `LeadSearch.jsx` — search interface and lead discovery form.
- `SavedLeads.jsx` — saved lead list and quick actions.
- `WebsiteAudits.jsx` — audit history and audit details.
- `Campaigns.jsx` — campaign management and email builder.
- `EmailGenerator.jsx` — cold email template interface.
- `Analytics.jsx` — performance insights and funnel charts.
- `Settings.jsx` — profile, workspace, notification, API keys, billing, security.
- `LeadDetails.jsx` — detailed lead profile, notes, tasks, audit summary.
- `AuthPage.jsx` — login, signup, and password reset screens.

### 3.2 Reusable components
- `Sidebar.jsx` — application navigation panel.
- `Header.jsx` — top bar with search, notifications, and profile menu.
- `PageHeader.jsx` — page-specific heading and description.
- UI widgets: `ChecklistWidget`, `WelcomeModal`, `CompletionModal`, `TourProvider`.
- Common UI components: modal dialogs, pagination, score badges, empty states.

## 4. Data models

### 4.1 User
- id: string
- name: string
- email: string
- password: string (frontend mock currently stores plaintext; backend must store hashed passwords)
- created: string

### 4.2 Lead
- id: string
- name: string
- industry: string
- website: string
- location: string
- size: string
- revenue: string
- description: string
- status: 'Discovered' | 'Saved'
- websiteStatus: string
- tags: string[]
- notes: Note[]
- tasks: Task[]
- activities: Activity[]
- auditSummary: AuditSummary | null
- aiInsights: AIInsights | null

### 4.3 Note
- id: string
- date: string
- author: string
- text: string

### 4.4 Task
- id: string
- title: string
- status: 'Pending' | 'Completed'
- dueDate: string

### 4.5 Audit
- id: string
- businessName: string
- website: string
- mobileResponsive: string
- ssl: string
- seoScore: number
- accessibility: number
- performanceScore: number
- loadSpeed: string
- status: string
- date: string

### 4.6 AuditSummary
- mobileResponsive: boolean
- ssl: boolean
- seoScore: number
- accessibility: number
- performanceScore: number
- loadSpeed: string
- lastAudited: string
- issues: string[]

### 4.7 AIInsights
- opportunityScore: number
- painPoints: string
- suggestedHook: string
- valueProp: string
- recommendedServices: string[]

### 4.8 Campaign
- id: string
- name: string
- status: 'Draft' | 'Running' | 'Completed'
- sentCount: number
- openedCount: number
- repliedCount: number
- createdDate: string
- leadsCount: number
- template: string
- subject: string
- content: string

### 4.9 Notification
- id: string
- text: string
- read: boolean
- time: string

### 4.10 Activity
- id: string
- type: string
- text: string
- time: string

## 5. Backend API Contract

### 5.1 Authentication

#### POST /api/auth/signup
Request body:
```json
{
  "name": "Alex Rivera",
  "email": "alex@leadflow.io",
  "password": "password123"
}
```
Response:
```json
{
  "id": "u_1",
  "name": "Alex Rivera",
  "email": "alex@leadflow.io",
  "created": "2026-06-01",
  "token": "..."
}
```

#### POST /api/auth/login
Request body:
```json
{
  "email": "alex@leadflow.io",
  "password": "password123"
}
```
Response:
```json
{
  "id": "u_1",
  "name": "Alex Rivera",
  "email": "alex@leadflow.io",
  "token": "..."
}
```

#### POST /api/auth/logout
Request body: none
Response:
```json
{ "success": true }
```

#### POST /api/auth/password-reset
Request body:
```json
{ "email": "alex@leadflow.io" }
```
Response:
```json
{ "success": true, "message": "Password reset link sent." }
```

#### POST /api/auth/reset-password
Request body:
```json
{
  "email": "alex@leadflow.io",
  "password": "newPassword123"
}
```
`
Response:
```json
{ "success": true }
```

### 5.2 Leads

#### GET /api/leads
Response:
```json
[ { lead }, { lead }, ... ]
```

#### POST /api/leads
Request body:
```json
{
  "name": "New Lead",
  "industry": "SaaS",
  "website": "example.com",
  "location": "Austin, TX",
  "size": "51-200",
  "revenue": "$12M",
  "description": "Lead description..."
}
```
Response:
```json
{ "id": "lead_x", "status": "Discovered", ... }
```

#### GET /api/leads/:leadId
Response:
```json
{ ...lead }
```

#### PATCH /api/leads/:leadId
Request body may include partial lead updates:
```json
{
  "status": "Saved",
  "websiteStatus": "Audited"
}
```
Response:
```json
{ ...updatedLead }
```

#### DELETE /api/leads/:leadId
Response:
```json
{ "success": true }
```

### 5.3 Lead notes and tasks

#### POST /api/leads/:leadId/notes
Request body:
```json
{ "text": "Follow up next week.", "author": "Alex Rivera" }
```
Response:
```json
{ "id": "n_1", "date": "2026-06-20", "author": "Alex Rivera", "text": "Follow up next week." }
```

#### POST /api/leads/:leadId/tasks
Request body:
```json
{ "title": "Send follow-up email", "dueDate": "2026-06-25" }
```
Response:
```json
{ "id": "t_1", "title": "Send follow-up email", "status": "Pending", "dueDate": "2026-06-25" }
```

#### PATCH /api/leads/:leadId/tasks/:taskId
Request body:
```json
{ "status": "Completed" }
```
Response:
```json
{ ...updatedTask }
```

### 5.4 Audits

#### GET /api/audits
Response:
```json
[ { audit }, { audit }, ... ]
```

#### POST /api/audits
Request body:
```json
{ "leadId": "lead_x" }
```
Response:
```json
{ "id": "aud_x", "businessName": "...", "status": "Completed", ... }
```

### 5.5 Campaigns

#### GET /api/campaigns
Response:
```json
[ { campaign }, ... ]
```

#### POST /api/campaigns
Request body:
```json
{
  "name": "Spring promo",
  "status": "Draft",
  "subject": "Quick growth strategy",
  "content": "Hi there...",
  "leadsCount": 45
}
```
Response:
```json
{ ...createdCampaign }
```

#### PATCH /api/campaigns/:campaignId
Request body:
```json
{ "status": "Running" }
```
Response:
```json
{ ...updatedCampaign }
```

### 5.6 Notifications

#### GET /api/notifications
Response:
```json
[ { notification }, ... ]
```

#### PATCH /api/notifications/:notificationId
Request body:
```json
{ "read": true }
```
```

### 5.7 User profile

#### GET /api/user
Response:
```json
{ "id":"u_1", "name":"Alex Rivera", "email":"alex@leadflow.io" }
```

#### PATCH /api/user
Request body:
```json
{ "name": "Alex Rivera", "email": "alex@leadflow.io" }
```

## 6. Frontend integration notes

### 6.1 Replace local storage auth
- Current auth implementation uses localStorage for users and current session.
- Backend should provide a real auth token or session cookie.
- `AuthContext` should store token and user metadata, then persist token in `localStorage` or cookies.
- All API calls should include authentication headers: `Authorization: Bearer <token>`.

### 6.2 Replace mock data with backend data
- `AppContext` currently initializes from `src/data/mockData.js`.
- Backend should serve data from API endpoints.
- On app boot, `AppContext` should fetch leads, audits, campaigns, notifications, activities, and KPI-summaries.
- When actions occur, frontend should call backend endpoints, then update local context state with the response.

### 6.3 Onboarding integration
- Backends can persist onboarding progress per user.
- A new endpoint is suggested:
  - `GET /api/onboarding`
  - `PATCH /api/onboarding`
- Onboarding state should include: `started`, `completed`, `selectedGoal`, `completedTasks`.

### 6.4 Suggested API endpoints for onboarding

#### GET /api/onboarding
Response:
```json
{
  "started": true,
  "completed": false,
  "selectedGoal": "Explore Everything",
  "completedTasks": ["search_lead"]
}
```

#### PATCH /api/onboarding
Request body:
```json
{ "completedTasks": ["search_lead", "save_lead"] }
```
Response:
```json
{ ...updatedOnboardingState }
```

## 7. Proposed backend implementation details

### 7.1 Authentication strategy
- Use hashed passwords and secure storage.
- Support JWT or session cookies.
- Implement login, signup, logout, password reset, and profile update.

### 7.2 Lead management
- Persist lead notes, tasks, and audit summaries.
- Implement filtering and search for leads.
- Support lead status toggles: `Discovered`, `Saved`.
- Provide endpoint for lead detail retrieval and updates.

### 7.3 Audit pipeline
- Allow audit creation and retrieval.
- Store audit results, SEO/accessibility/performance scores.
- Keep audit issues for detailed view.

### 7.4 Campaign workflow
- Store campaign metadata and send status.
- Track engagement metrics using fields: `sentCount`, `openedCount`, `repliedCount`.
- Support campaign status changes and preview content.

### 7.5 Notifications & activity feed
- Log user actions into activity feed.
- Push notifications for audits, replies, and campaign updates.
- Provide read/unread status for notification items.

## 8. Developer handoff checklist

- [ ] Implement auth backend with secure password hashing.
- [ ] Add `/api/auth/*` endpoints.
- [ ] Create backend lead CRUD endpoints.
- [ ] Add note/task nested endpoints for leads.
- [ ] Add audit and campaign endpoints.
- [ ] Add user profile and settings endpoints.
- [ ] Persist onboarding progress.
- [ ] Replace current mock state fetch with backend API calls.
- [ ] Ensure frontend uses `Authorization` headers.
- [ ] Confirm UI flows still work after backend integration.

---

### Notes
- This document assumes the frontend continues to use the existing design system and component patterns.
- The auth flow currently uses local client-side storage and should be replaced with secure backend authentication before production.
