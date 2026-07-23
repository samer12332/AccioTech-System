# Project conventions

Keep names clear and unsurprising. Prefer the conventions below unless a framework imposes a specific pattern.

| Area                           | Convention                                                                      | Example                              |
| ------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------ |
| Folders                        | lowercase kebab-case                                                            | `student-profile/`                   |
| TypeScript source files        | lowercase kebab-case                                                            | `attendance-service.ts`              |
| React components               | PascalCase component name; file may be PascalCase when it exports one component | `StudentCard.tsx`                    |
| Variables and functions        | camelCase                                                                       | `calculateTotal`, `studentCount`     |
| Classes, types, and interfaces | PascalCase; omit the `I` prefix for interfaces                                  | `AttendanceService`, `StudentRecord` |
| Environment variables          | UPPER_SNAKE_CASE                                                                | `DATABASE_URL`                       |
| Git branches                   | lowercase kebab-case with a purpose prefix                                      | `feat/student-attendance`            |
| Commit messages                | imperative Conventional Commit style                                            | `feat: add attendance endpoint`      |

Use branch prefixes such as `feat/`, `fix/`, `docs/`, `chore/`, and `refactor/`. Keep commit subjects concise and scoped to one logical change.

## UI conventions

Use semantic design tokens and shared UI primitives before adding page-specific
components. Keep the light AccioTech interface professional and accessible:
navy provides the primary foundation, cyan is the technology accent, and gold
is used sparingly for AccioTech emphasis. Provide visible keyboard focus,
semantic controls, and accessible status or alert messaging.

Avoid random gradients and generic AI-dashboard styling. Do not introduce a UI
library without an explicit architectural decision.

`/dev/ui` is the canonical visual reference for shared tokens and primitives. Keep examples neutral and free of business data, and represent all new primitives or variants there. Review it at desktop and mobile widths; it uses `AppShell` but contains no authorization or business logic.

## Application shell

System pages should use `AppShell` so navigation, landmarks, and responsive behavior remain consistent. Supply navigation items as configuration rather than embedding page-specific navigation in the shell; desktop and mobile layouts share that source. Keep the mobile menu as the only Client Component boundary; the shell and page content should remain server components where possible.

`/dev/shell` is the internal preview for this foundation. Navigation visibility is not authorization: business authorization must be enforced by the relevant application logic, not through hidden navigation alone. Review visual shell changes at both desktop and mobile widths.
