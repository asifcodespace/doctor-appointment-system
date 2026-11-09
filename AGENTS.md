# Project Guidelines

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

