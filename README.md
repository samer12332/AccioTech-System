# AccioTech Operating System

> From Imagination to Innovation

AccioTech Operating System is the future operational platform for AccioTech, an educational technology organization. It will bring core organizational workflows into one production-oriented web system.

## Architecture direction

The project is a modular monolith in an npm-workspaces monorepo:

- `apps/web` — planned Next.js, TypeScript, and App Router frontend.
- `apps/api` — planned NestJS and TypeScript REST API.
- `packages/shared` — future shared TypeScript contracts, added only when justified.
- PostgreSQL and Prisma are planned for persistence in a later task.

## Locked technology stack

- Package manager: npm
- Frontend: Next.js + TypeScript + App Router (planned)
- Backend: NestJS + TypeScript + REST API (planned)
- Database: PostgreSQL + Prisma ORM (planned)
- Architecture: modular monolith + monorepo

## Repository structure

```text
acciotech-system/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── docs/
├── docker/
├── .github/
├── .editorconfig
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

## Prerequisites

- A current Node.js LTS release compatible with the applications when they are initialized.
- npm, included with Node.js.
- Git.

## Installation

From the repository root, run:

```bash
npm install
```

This creates the workspace lockfile. There are intentionally no application dependencies yet. Frontend and backend initialization happen in subsequent tasks.

## Workspace conventions

- Keep runnable applications in `apps/` and reusable, justified code in `packages/`.
- Keep technical documentation in `docs/`.
- Keep future Docker support files in `docker/`.
- Do not introduce shared code or tooling until a real use case exists.
- Follow the concise naming guidance in [docs/conventions.md](docs/conventions.md).

## Environment files

Commit only environment templates such as `.env.example` and `.env.local.example`. Create untracked local `.env` files from the appropriate example when configuration is introduced. Never commit secrets.

## Development workflow

1. Create or switch to a focused branch.
2. Install dependencies from the repository root when package manifests change.
3. Implement the scoped task and run the checks that exist for it.
4. Review `git status` before committing.

Root development, lint, type-check, test, and build commands will be added only after their corresponding applications and checks exist.

## Daily Git commit policy

Make small, reviewable commits at the end of a completed, verified unit of work. Do not commit partial or unreviewed changes; one Day 1 commit will follow the completion and review of all three Day 1 mini tasks.

## Current project status

| Status | Scope |
| --- | --- |
| Planned | Frontend, backend, database, domain modules, testing, Docker services, and CI/CD. |
| In progress | Week 1 infrastructure and design foundation. |
| Completed | Week 1, Day 1, Mini Task 1 workspace foundation. |
