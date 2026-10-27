Start here: open `CHALLENGE.html` in your browser (or read `CHALLENGE.md`).

<!--
 ~ Copyright DB InfraGO AG and contributors
 ~ SPDX-License-Identifier: Apache-2.0
 -->

# Role Board

A small Next.js starter for managing the roles and departments of users, used as a live interview challenge.

## Commands

```bash
bun install
bun dev              # localhost:3000
bun run lint
bun run typecheck
```

## Fake SSO

There is no real login. The select in the header ("Acting as") picks the current user and stores the id in the `demo-user` cookie; `getCurrentUser()` in `src/lib/session.ts` reads it on the server. Without a cookie you act as `applicant-1`.

## Data

All data is in memory, seeded from `src/lib/seed.ts`. It resets when the dev server restarts, or when you click "Reset data" in the header.

## Third-party agent skills

`.agents/skills/` contains skills copied from eservice:

- `vercel-react-best-practices` — MIT (see its `SKILL.md` frontmatter).
- `emil-design-eng`, `animate`, `animation-vocabulary`, `find-animation-opportunities`, `improve-animations`, `review-animations` — copied from eservice; check redistribution rights before publishing.

## License

Apache-2.0, see `LICENSE`.

## Publishing (interviewer)

Only `main` is meant to be public. Create an empty GitHub repository, then:

```bash
git remote add origin <url> && git push -u origin main
```
