# AccioTech Operating System

Internal operating-system foundations for AccioTech. Week 1 establishes the shared workspace, application runtime, database tooling, quality checks, and internal UI references used by future feature work.

## Technology stack

- Node.js 22 and npm workspaces
- Next.js, TypeScript, App Router, Vitest, React Testing Library, and Playwright
- NestJS, TypeScript, Vitest, and Supertest
- PostgreSQL 17 in Docker and Prisma

## Repository structure

```text
apps/web              Next.js frontend and internal UI references
apps/api              NestJS API, Prisma schema, migrations, and seed
docs                  Project conventions and foundation reports
docker-compose.yml    Local PostgreSQL service
packages/shared       Reserved for justified shared contracts
```

## Prerequisites

- Node.js 22
- npm
- Docker Desktop
- Git

## Environment setup

Copy the tracked templates before starting local services. Never commit real `.env` files.

```powershell
Copy-Item .env.example .env
Copy-Item apps/api/.env.example apps/api/.env
```

The development PostgreSQL service uses host port `5434`, database `acciotech`, user `postgres`, and the development-only example password `acciotech_dev_password`. Fresh local environments should keep the root and API `DATABASE_URL` values aligned. Existing Docker volumes retain the credentials with which they were first created.

## Installation

```powershell
npm install
```

## Development startup

```powershell
npm run docker:up
npm run dev:api
npm run dev:web
```

- Frontend: http://localhost:3000
- API health: http://localhost:3001/api/health
- Swagger: http://localhost:3001/api/docs
- UI reference: http://localhost:3000/dev/ui
- Shell reference: http://localhost:3000/dev/shell
- Dashboard reference: http://localhost:3000/dev/dashboard

## Database commands

Run these existing API workspace commands from the repository root while PostgreSQL is running:

```powershell
npm run prisma:generate --workspace=api
npm run prisma:migrate:dev --workspace=api
npm run prisma:migrate:status --workspace=api
npm run prisma:seed --workspace=api
```

## Quality and testing

```powershell
npm run quality
npm run test:api
npm run test:e2e:api
npm run test:web
npm run test:e2e:web
npm run build:api
npm run build:web
```

## Git workflow

Development work currently targets `dev`. Keep one focused commit per mini task, commit only after review and manual verification, and never commit secrets or generated artifacts.
