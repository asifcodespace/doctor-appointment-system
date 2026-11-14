# Project Guidelines for AI Agents & Developers

## AI Agent Quick-Start & Architecture Map
- **Project Structure Source of Truth**: Before exploring files or running deep recursive searches, refer to [PROJECT_STRUCTURE.md](file:///home/asif/Projects/Full_stack_projects/doctor-s_Brand_Frontend+Backend/PROJECT_STRUCTURE.md).
- **Subsystem Breakdown**:
  - `Backend_Go/`: Go 1.24 REST API running on `:4000` (PostgreSQL, SQLX).
  - `Frontend_Svelte/Admin/`: SvelteKit Admin portal running on `:5174` (Svelte 5 runes, live server status sync).
  - `Frontend_Svelte/Client/`: SvelteKit Patient booking & brand portal.
  - `scripts/verify-structure.sh`: Quick structure verification script.

## Mandatory Agent Handoff Protocol
1. **On Arrival**:
   - Read [PROJECT_STRUCTURE.md](file:///home/asif/Projects/Full_stack_projects/doctor-s_Brand_Frontend+Backend/PROJECT_STRUCTURE.md) to understand current directory layout, ports, and API routes without burning unnecessary tokens.
2. **During Work**:
   - **Modular Architecture & File Separation**: Keep code structure clean and easy to navigate for the future. Always separate components, types, mock data, and utilities into dedicated files and folders to one's utmost rather than creating monolithic files. Never dump massive data structures or multiple components in a single file.
   - Respect component and layer boundaries (Go: handler -> service -> repo -> domain; Frontend: Svelte 5 runes).
   - Strictly follow the Tailwind CSS v4 conventions below.
3. **Before Departure (Task Completion)**:
   - If any directories, files, endpoints, routes, or database schemas were added, modified, or removed:
     - Update [PROJECT_STRUCTURE.md](file:///home/asif/Projects/Full_stack_projects/doctor-s_Brand_Frontend+Backend/PROJECT_STRUCTURE.md) to reflect the new state so subsequent agents stay informed.
     - Run `bash scripts/verify-structure.sh` to confirm structural integrity.

## Tailwind CSS v4 Conventions
- This project uses Tailwind CSS v4.
- Do not use arbitrary value syntax with brackets when a native v4 utility exists:
  - Write `min-h-225` instead of `min-h-[900px]` (value / 4 = utility index).
  - Write `w-62.5` instead of `w-[250px]`.
  - Write `min-h-11` instead of `min-h-[44px]`.
  - Write `min-w-11` instead of `min-w-[44px]`.
  - Write `min-w-225` instead of `min-w-[900px]`.
  - Write `gap-4.5` instead of `gap-[18px]`.
  - Write `p-5.5` instead of `p-[22px]`.
  - Write `rounded-5` instead of `rounded-[20px]`.
  - Write `rounded-0.75` instead of `rounded-[3px]`.
  - Write `z-100` instead of `z-[100]`.
  - Prefer native numerical utility classes (e.g. `z-100`, `w-4.5`, `max-w-35`, `min-h-225`) over bracketed arbitrary syntax like `z-[100]`, `w-[18px]`, `max-w-[140px]`, `min-h-[900px]`.
