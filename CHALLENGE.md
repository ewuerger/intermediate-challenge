<!--
 ~ Copyright DB InfraGO AG and contributors
 ~ SPDX-License-Identifier: Apache-2.0
 -->

# Role Board Challenge

Visual version of this brief: `CHALLENGE.html`.

## 1. Role description

Admin (technical role) has full write access, sets manager roles and assigns departments. Manager manages the reviewers and approvers of his department(s), sets departments on them, and has all privileges of the lower roles for his departments. Hierarchy: admin > manager > reviewer + approver > applicant. Reviewers, approvers and managers can belong to several departments.

## 2. Departments

ETCS, DSTW, LBS, Bahnhöfe.

## 3. Task

Build the management board: admins and managers can change a user's role and departments according to these rules. Enforce the rules on the server.

## 4. Time box

30 minutes: 5 min questions and reading the repo, 20 min build, 5 min walkthrough.

Ask your questions first. Using the AI assistant is expected.

## 5. Getting started

```bash
bun install
bun dev
# open localhost:3000 in your browser
```

Switch the acting user in the header. "Reset data" restores the seed.

## 6. Demo users

|id|name|role|departments|
|---|---|---|---|
|`admin-1`|Ada Admin|admin|–|
|`admin-2`|Adam Admin|admin|–|
|`manager-1`|Mia Manager|manager|ETCS, DSTW|
|`manager-2`|Max Manager|manager|DSTW|
|`manager-3`|Lea Manager|manager|LBS, Bahnhöfe|
|`reviewer-1`|Rita Reviewer|reviewer|ETCS|
|`reviewer-2`|Ralf Reviewer|reviewer|ETCS, LBS|
|`reviewer-3`|Rosa Reviewer|reviewer|–|
|`approver-1`|Anton Approver|approver|DSTW|
|`approver-2`|Alina Approver|approver|Bahnhöfe|
|`newbie-1`|Nina Neu|no role|–|
|`applicant-1`|Hans Hersteller|applicant|–|

## 7. Where things are

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
