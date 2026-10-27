---
name: frontend-rules-check
description: Audit new or changed code under src against the repo-root AGENTS.md (authorization, components, primitives, styling, state, tests) and the adopted Vercel React best practices, then fix every violation in that code. Must run in a separate agent context after every change under src is implemented, before the work is reported done. Do not wait for a commit. Use when a change was just implemented, or when asked to check, enforce, or fix frontend rules.
---

# Frontend Rules Check

Runs after every change under `src/` is implemented, before the work is reported done. It finds every rule violation in the new or changed code, fixes it, verifies the fix, and reports. It does not add features, refactor untouched code, or change rules.

## Hard rules

1. **Separate context.** Run in a fresh subagent, never in the conversation that wrote the code. If you wrote the code under review in this conversation, stop and launch a subagent instead with the prompt: `Read and follow .agents/skills/frontend-rules-check/SKILL.md. Scope: staged and unstaged changes.`
2. **Rule source.** The repo-root `AGENTS.md` is the rule source. Re-read it in full on every run. Do not rely on memory or on the checklist below alone: the checklist is a detection aid, AGENTS.md wins on any difference. Also read `.agents/skills/vercel-react-best-practices/SKILL.md`.
3. **Scope.** Check and fix only files in scope. Legacy code that already breaks a rule is out of scope unless it is in a changed file; then fix the violations in that file the change touched or introduced, and list the remaining legacy ones in the report without fixing them.
4. **Never edit:** `AGENTS.md`, or shadcn primitives in `src/components/ui/` (unless the change itself added a new primitive there). If a fix needs one of these, stop and report it as **Blocked**.
5. **No new unit tests.** Delete any `*.test.ts(x)`, `*.spec.ts(x)`, or Vitest file the change added.
6. **Preserve behavior.** Fixes restructure code (move, rename, extract). They do not change what the feature does. If the only compliant fix changes behavior, or the rule is ambiguous for this case, report it as **Needs decision** instead of guessing.

## Workflow

### 1. Determine scope

The scope is the next commit: staged, unstaged, and untracked files under `src`. Already committed code is never in scope. Run from the repo root:

```bash
git diff --name-only --cached --diff-filter=ACMR -- src
git diff --name-only --diff-filter=ACMR -- src
git ls-files --others --exclude-standard -- src
```

Only narrow this when the prompt says so: `staged` (first command only) or an explicit file list. Drop `src/components/ui/` primitives the change did not add. Also run `git diff HEAD -- src` so you know which lines are new; untracked files are new in full.

If the list is empty, report "No frontend changes in scope" and stop.

### 2. Load the rules

Read every file named in Hard rule 2. Then build a working checklist from AGENTS.md: one line per rule, grouped by its sections, plus the React best practices.

### 3. Mechanical scan

Run these searches over the files in scope as a first pass (`rg` from the repo root). A hit is a candidate, not a verdict: confirm each against the rule text.

| Rule area | What to search for |
|---|---|
| Authorization | exported functions in `"use server"` files that write to the store without first loading the current user and checking permission |
| Shared components | `@/lib/store` or `@/lib/session` imports in `src/components` |
| Colors | Tailwind palette classes such as `(bg\|text\|border\|ring\|fill\|stroke\|from\|via\|to\|outline\|divide\|shadow\|decoration\|accent\|caret)-(slate\|gray\|zinc\|neutral\|stone\|red\|orange\|amber\|yellow\|lime\|green\|emerald\|teal\|cyan\|sky\|blue\|indigo\|violet\|purple\|fuchsia\|pink\|rose\|black\|white)(-\d{2,3})?`, arbitrary colors (`-[#`, `-[rgb`, `-[hsl`, `-[oklch`), inline `style={{ color`/`background` |
| Derived state | `useEffect` that only calls a `set*` from props or other state |
| Tests | new `*.test.*` / `*.spec.*` files |

### 4. Rule-by-rule review

Read every in-scope file in full (not only the diff) and walk the whole checklist from step 2. Mechanical search does not cover these, so check them by reading:

- **Server-side authorization:** every mutation checks permissions on the server. Hiding a control in the UI is not a check.
- **Shared components** are prop-driven and do not read the store.
- **Primitives** are imported from `@/components/ui/*` and not restyled locally.
- **React best practices** (adopted subset): derived state computed during render, not via effect; interaction logic in event handlers, not effects; no components defined inside components; functional `setState` when based on previous state; split combined hooks; `toSorted()` over `sort()`; explicit ternaries for conditional rendering of numbers; no barrel-file imports of third-party libraries.

Record each violation as `path:line — rule (AGENTS.md section) — what is wrong — fix`.

### 5. Fix

Fix every in-scope violation, smallest compliant change first. Typical fixes:

- move a store read out of a shared component into the page and pass the data as props;
- add the missing permission check to the server action;
- replace a derived-state effect with a value computed during render;
- replace palette colors with the named tokens in `globals.css` (add a token there only when none fits).

Do not touch anything in Hard rule 4. Do not "improve" code that does not violate a rule.

### 6. Verify

From the repo root, all must pass:

```bash
bun run lint
bun run typecheck
```

Then repeat steps 3–4 on the files in scope (including any files you created or moved). Loop steps 3–6 until a full pass finds no new violations, at most 3 passes. Anything still open after 3 passes goes into the report as **Unresolved**.

### 7. Report

Return this to the calling agent:

```markdown
## Frontend rules check — <PASS | FAIL>

Scope: <scope>, <n> files

### Fixed
- `path:line` — <rule (AGENTS.md section)> — <what changed>

### Blocked / Needs decision / Unresolved
- `path:line` — <rule> — <why it was not fixed> — <what the user must decide>

### Legacy violations in touched files (not fixed)
- `path:line` — <rule>

### Verification
- lint: pass/fail
- typecheck: pass/fail
```

The result is **PASS** only when every in-scope violation is fixed and all verification commands pass. Anything under Blocked, Needs decision, or Unresolved makes it **FAIL**. Show those items to the user and do not treat the change as finished.
