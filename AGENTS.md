# AI Agent Instructions for this Repository

## Purpose

This file helps AI coding agents understand the current repository structure and the intended monorepo architecture.

## Current repo state

- `apps/backend` exists and is a NestJS v11 starter application.
- There is no `apps/frontend` Vue app yet in the checked-in workspace.
- Root `README.md` is empty; `apps/backend/README.md` is the default NestJS starter README.

## Monorepo architecture expectation

- `apps/backend` — NestJS backend service.
- `apps/frontend` — Vue frontend application (should be created if requested).
- `apps/shared` or `libs` may be added later for reusable code across apps.
- Docker, GitHub CI/CD, and Kubernetes manifests should live at repository root or under `.github/workflows`, `docker/`, `k8s/`, or equivalent directories.

## GraphQL

- The backend exposes a GraphQL endpoint (recommended `/graphql`) for frontend integration.
- Use NestJS `@nestjs/graphql` (code-first) to generate the schema and serve the GraphQL API for the frontend.
- Frontend apps should prefer the GraphQL endpoint for aggregated reads and modern client tooling (Apollo, urql, etc.).

## How to work in this repo

- Prefer `pnpm` for install/build/test if package manifests exist.
- Use NestJS conventions for backend modules, controllers, services, and config.
- When adding a frontend app, use Vue 3 + Vite and place it in `apps/frontend`.
- Keep generated apps and infrastructure files consistent with a multi-tenant SaaS layout.

## Key project themes

- Multi-tenant: treat tenant identity as a first-class request/context value.
- Event-driven: use Redis pub/sub, streams, or Redis-backed messaging for async workflows.
- Master data: include lightweight reference data structures and CRUD APIs.
- Authentication: use NestJS auth patterns (JWT or session-based) for backend APIs.

## Recommended conventions for the agent

- Do not assume `apps/frontend` exists; create it only when a feature or request requires the UI.
- Do not add files outside the monorepo layout unless the task explicitly requires infra or tooling.
- Use existing NestJS patterns in `apps/backend` and avoid conflicting with the current scaffold.
- Prefer small, focused changes rather than broad refactors when adding features.

## Common tasks for this repo

- Add or extend backend modules under `apps/backend/src/app/modules/`.
- Add `Dockerfile` and `docker-compose.yml` for development and service composition.
- Add GitHub Actions workflows under `.github/workflows/` for build/test/deploy.
- Add Kubernetes manifest templates under `k8s/` or similar when enabling Kubernetes deployment.

## Important note

The repository currently contains only the backend starter app. Do not assume the frontend or CI/Kubernetes configs already exist unless new files are being created as part of a requested enhancement.

## Coding Style

- All functions must explicitly define a return type, e.g. `(): Promise<Xxx>`.
- Types should be imported from existing type definitions or defined in dedicated type files, e.g. `xxx.type.ts`.
- Strictly no `any`.
- Always use braces `{}` for `if`, `else if`, and `else` blocks, even when the block contains only a single statement.

### Example

❌ Do not write:

```ts
if (isValid) return result;
```

✅ Always write:

```ts
if (isValid) {
  return result;
}
```

## Agent skills

### Issue tracker

Issues live in GitHub Issues for this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

This repo uses the default canonical triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

This repo is configured as a single-context layout. See `docs/agents/domain.md`.
