<!--
 ~ Copyright DB InfraGO AG and contributors
 ~ SPDX-License-Identifier: Apache-2.0
 -->

# AGENTS.md

Role Board: a small Next.js app for managing the roles and departments of users. Briefing is in `CHALLENGE.md`.

## Stack

- Bun, Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, shadcn/ui (Base UI), Biome.
- No database: data lives in an in-memory store seeded from `src/lib/seed.ts`.

## Commands

- Install: `bun install`
- Dev server: `bun dev` → http://localhost:3000
- Lint: `bun run lint`
- Typecheck: `bun run typecheck`
- Build: `bun run build`

## File map

- `src/lib/domain.ts` — `Role`, `DepartmentId`, `Department`, `User` types.
- `src/lib/seed.ts` — seed departments and demo users.
- `src/lib/store.ts` — in-memory store (read helpers, `resetStore`).
- `src/lib/session.ts` — fake SSO: `getCurrentUser()` reads the `demo-user` cookie.
- `src/app/actions/session.ts` — server actions `switchUser`, `resetData`.
- `src/components/user-switcher.tsx` — header select for the acting user.
- `src/app/layout.tsx` — header, nav, user switcher.
- `src/app/page.tsx` — users table.
- `src/app/departments/page.tsx` — departments table.
- `src/components/ui/*` — generated shadcn primitives.
- Agent skills live in `.agents/skills/`.

## Rules

- Authorization happens in server actions, not only by hiding UI.
- Shared components in `src/components/` are prop-driven and don't read the store.
- Use shadcn primitives from `@/components/ui/*` without restyling them locally.
- No Tailwind palette colors or arbitrary colors, only theme tokens.
- Derived state is computed during render, not in effects.
- No unit tests.
- After each change under `src/`, run the `frontend-rules-check` skill in a separate subagent.
