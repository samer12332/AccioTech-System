# AccioTech Operating System

> From Imagination to Innovation

AccioTech Operating System is the future operational platform for AccioTech, an educational technology organization. It will bring core organizational workflows into one production-oriented web system.

## Architecture direction

The project is a modular monolith in an npm-workspaces monorepo:

- `apps/web` — planned Next.js, TypeScript, and App Router frontend.
- `apps/api` — planned NestJS and TypeScript REST API.
- `packages/shared` — future shared TypeScript contracts, added only when justified.
- PostgreSQL and Prisma provide the initial persistence foundation.

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
- Docker Desktop with Docker Compose for local PostgreSQL development.

## Installation

From the repository root, run:

```bash
npm install
```

This installs all workspace dependencies and creates the single root workspace lockfile.

## Workspace conventions

- Keep runnable applications in `apps/` and reusable, justified code in `packages/`.
- Keep technical documentation in `docs/`.
- Keep future Docker support files in `docker/`.
- Do not introduce shared code or tooling until a real use case exists.
- Follow the concise naming guidance in [docs/conventions.md](docs/conventions.md).

## Environment files

Commit only environment templates such as `.env.example` and `.env.local.example`. Create untracked local `.env` files from the appropriate example when configuration is introduced. Never commit secrets.

The root `.env.example` configures local Docker/PostgreSQL infrastructure. `apps/api/.env.example` configures the backend `DATABASE_URL`. Copy each template to its corresponding untracked `.env` file for local development; never commit the real `.env` files.

## Local PostgreSQL

This repository uses Docker PostgreSQL for application development. The Prisma datasource uses Docker on port `5433`, never the separate local PostgreSQL instance on port `5432`.

Two PostgreSQL instances can run simultaneously because they use different host ports:

| Instance | Host | Port | User | Database |
| --- | --- | --- | --- | --- |
| Local PostgreSQL / pgAdmin | `localhost` | `5432` | `postgres` | Your local databases |
| AccioTech Docker PostgreSQL | `localhost` | `5433` (mapped to container `5432`) | `postgres` | `acciotech` |

AccioTech Docker PostgreSQL uses `postgres:17-alpine` with a persistent named volume. Its development connection string is:

```text
postgresql://postgres:acciotech_dev_password@localhost:5433/acciotech
```

Start and inspect the Docker PostgreSQL service from the repository root:

```powershell
docker compose up -d
docker compose ps
docker compose logs postgres
```

Stop the service without deleting its persistent named volume:

```powershell
docker compose down
```

The equivalent npm wrappers are `npm run docker:up`, `npm run docker:logs`, and `npm run docker:down`.

## Prisma

Prisma is contained entirely in `apps/api`: the schema, migrations, and idempotent technical seed are in `apps/api/prisma/`, and the generated client is regenerated into an ignored API source directory. Docker PostgreSQL must be running on `localhost:5433` before using Prisma commands.

Run Prisma commands from the repository root:

```powershell
npm run prisma:validate --workspace=api
npm run prisma:generate --workspace=api
npm run prisma:migrate:dev --workspace=api
npm run prisma:migrate:status --workspace=api
npm run prisma:seed --workspace=api
```

The initial `SystemMetadata` model is technical infrastructure only, used to prove the migration, generated client, and seed workflow. The AccioTech business ERD has intentionally not been implemented yet.

## Development workflow

1. Create or switch to a focused branch.
2. Install dependencies from the repository root when package manifests change.
3. Implement the scoped task and run the checks that exist for it.
4. Review `git status` before committing.

Useful workspace commands:

```bash
npm run dev:web
npm run build:web
npm run dev:api
npm run build:api
npm run lint:api
npm run typecheck:api
```

## Daily Git commit policy

Make small, reviewable commits at the end of a completed, verified unit of work. Do not commit partial or unreviewed changes; one Day 1 commit will follow the completion and review of all three Day 1 mini tasks.

## Current project status

| Status | Scope |
| --- | --- |
| Planned | Frontend, backend, database, domain modules, testing, Docker services, and CI/CD. |
| In progress | Week 1 infrastructure and design foundation. |
| Completed | Week 1, Day 1, Mini Task 1 workspace foundation; Mini Task 2 Next.js frontend initialization; Mini Task 3 NestJS backend initialization. |
