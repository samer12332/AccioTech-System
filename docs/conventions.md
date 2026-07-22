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
