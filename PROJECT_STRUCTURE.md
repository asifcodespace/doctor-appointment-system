# Project Architecture & Structure Map

> **Notice for AI Agents**: Read this document on entry to understand the project architecture without burning tokens scanning files. When you modify, add, or delete any components, endpoints, directories, or schemas, you **must update this document** before completing your task. Run `bash scripts/verify-structure.sh` to verify.

---

## 1. Monorepo Overview

| Subsystem | Directory | Tech Stack | Port / URL | Description |
|---|---|---|---|---|
| **Backend API** | `Backend_Go/` | Go 1.24, SQLX, PostgreSQL | `:4000` | REST API handling appointments & server status |
| **Admin Portal** | `Frontend_Svelte/Admin/` | SvelteKit, Svelte 5, Tailwind v4 | `:5174` | Doctor/staff management dashboard |
| **Client Portal** | `Frontend_Svelte/Client/` | SvelteKit, Svelte 5, Tailwind v4 | Vite default | Patient-facing booking & brand website |

---

## 2. Directory Map & Responsibilities

```text
├── AGENTS.md                          # Global AI Agent guidelines & Tailwind v4 conventions
├── CLAUDE.md                          # Agent onboarding instructions (Claude / Cursor mirror)
├── PROJECT_STRUCTURE.md               # [THIS FILE] Canonical architecture & structure map
├── scripts/
│   └── verify-structure.sh           # Structure validator & quick-audit tool for agents
├── Backend_Go/
│   ├── cmd/serve.go                  # Server bootstrap & dependency wiring
│   ├── config/config.go              # Environment & DB config loader
│   ├── domain/appointment.go         # Core appointment domain model
│   ├── repo/appointment.go           # SQL queries & DB interaction layer
│   ├── appointment/service.go        # Business logic & ports
│   ├── rest/
│   │   ├── server.go                 # HTTP server & routing initialization
│   │   ├── middlewares/              # CORS, Preflight, Logger, JWT middlewares
│   │   └── handlers/
│   │       ├── appointment/          # CRUD endpoints for appointments & stats
│   │       └── server_status/        # GET /server/status endpoint
│   ├── migrations/                   # SQL migration files
│   └── infra/db/                     # PostgreSQL connection & migration runner
└── Frontend_Svelte/
    ├── Admin/                        # Admin portal SvelteKit application
    │   ├── src/
    │   │   ├── lib/
    │   │   │   ├── api.ts            # Centralized API client & TypeScript interfaces
    │   │   │   ├── index.ts          # Barrel export for Admin components and types
    │   │   │   ├── types/
    │   │   │   │   ├── dashboard.ts  # Types for metrics, charts, donut, list, doctors
    │   │   │   │   └── dashboard-mock.ts # Default seed data matching design reference
    │   │   │   └── components/
    │   │   │       ├── dashboard/    # Modular dashboard component suite
    │   │   │       │   ├── Sidebar.svelte
    │   │   │       │   ├── Header.svelte
    │   │   │       │   ├── StatCards.svelte
    │   │   │       │   ├── WeeklyChart.svelte
    │   │   │       │   ├── StatusDonut.svelte
    │   │   │       │   ├── UpcomingList.svelte
    │   │   │       │   └── DoctorsOnDuty.svelte
    │   │   │       └── appointments/ # Modular appointments component suite
    │   │   │           ├── AppointmentsHeader.svelte
    │   │   │           ├── AppointmentsStats.svelte
    │   │   │           └── AppointmentsTable.svelte
    │   │   └── routes/
    │   │       ├── +page.svelte              # Main dashboard orchestrator (real-time sync)
    │   │       └── appointments/+page.svelte # Dedicated appointments management page
    │   └── package.json              # Runs on port 5174 (`npm run dev`)
    └── Client/                       # Patient brand & booking SvelteKit website
        ├── src/                      # Client UI components and pages
        └── package.json              # Client portal package configuration
```

---

## 3. Active REST API Endpoints (`Backend_Go` on `:4000`)

| Method | Endpoint | Handler | Description |
|---|---|---|---|
| `GET` | `/server/status` | `server_status.GetStatus` | Health check, returns `{connected: true, lastSyncSeconds: 0, timestamp: ...}` |
| `GET` | `/appointments` | `appointment.GetAppointments` | List appointments (supports `?search=`, `?page=`, `?limit=`) |
| `GET` | `/appointments/stats` | `appointment.GetAppointmentStats` | Returns summary counts: `{totalToday: number}` |
| `POST` | `/appointments` | `appointment.CreateAppointment` | Create a new appointment booking |
| `PATCH` | `/appointments/:id/status` | `appointment.UpdateStatus` | (Planned/Client) Update appointment status |

---

## 4. Database Schema (PostgreSQL)

Table: `appointments` (defined in `Backend_Go/migrations/000002-create-appointments.up.sql`)
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY`
- `name`: `VARCHAR(255) NOT NULL`
- `phone`: `VARCHAR(50) NOT NULL`
- `reason`: `VARCHAR(255)`
- `message`: `TEXT`
- `created_at`: `TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
- `updated_at`: `TIMESTAMP DEFAULT CURRENT_TIMESTAMP`

---

## 5. Development Conventions

1. **Tailwind CSS v4 Utilities**:
   - Prefer native numerical utility classes over bracketed arbitrary values.
   - Examples: `z-100` (not `z-[100]`), `min-h-225` (not `min-h-[900px]`), `w-62.5` (not `w-[250px]`), `gap-4.5` (not `gap-[18px]`).
2. **Svelte 5 Runes**:
   - Use `$state(...)`, `$derived(...)`, and `$effect(...)`.
3. **Backend Clean Architecture**:
   - Route -> Handler -> Service (Business logic) -> Repository (DB SQL) -> Domain.
4. **Real-time Admin UI**:
   - Admin UI syncs in real-time with the Go server.
   - Dynamic elapsed counter increments every second.
   - Periodic background sync refreshes data every 15s.

---

## 6. AI Agent Handoff Protocol

Every AI agent working in this repository must follow this protocol:

1. **On Arrival (Read-First)**:
   - Check `AGENTS.md` and `PROJECT_STRUCTURE.md` before exploring code. Do NOT run broad recursive file scans.
2. **During Development**:
   - Respect directory boundaries and conventions.
   - If adding new routes/handlers, wire them in `Backend_Go/rest/handlers/` and register them in `cmd/serve.go`.
   - If adding frontend features, update `#lib/api.ts` types and endpoints.
3. **Before Finishing (Handoff)**:
   - If any directories, files, endpoints, or tables were added, removed, or renamed:
     1. Update the directory map or API table in `PROJECT_STRUCTURE.md`.
     2. Run `bash scripts/verify-structure.sh` to confirm all paths and components are aligned.
     3. Mention any architectural updates in your final summary to the user.

