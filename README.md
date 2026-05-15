# THINICONS

Developer-first icon ecosystem built for speed, consistency, and customization.

Thinicons is focused on one job: delivering consistent, customizable SVG icons for frontend teams.

## What Thinicons Is

- Open-source icon library ecosystem
- React + TypeScript friendly
- Tree-shakeable package exports
- SVG-first pipeline with optimization and metadata
- Docs/playground for search, copy, and preview workflows

## What Thinicons Is Not

- Not an AI icon generator
- Not a SaaS product
- Not a design QA/automation platform
- No auth, database, or backend complexity

## Tech Stack

- Turborepo
- pnpm workspaces
- TypeScript (strict mode)
- React 19
- Next.js App Router
- Tailwind CSS
- SVGO + SVGR
- tsup
- Changesets
- ESLint + Prettier
- Husky + lint-staged

## Monorepo Structure

```text
thinicons/
├─ apps/
│  └─ docs/                  # Next.js docs + icon explorer
├─ packages/
│  ├─ core/                  # Raw SVGs, metadata, optimization pipeline
│  ├─ react/                 # Typed React icon components
│  └─ cli/                   # thinicons CLI
├─ examples/
│  └─ vanilla-no-node.html   # Simple HTML/CDN example
├─ turbo.json
├─ pnpm-workspace.yaml
└─ package.json
```

## Packages

### `@thinicons/core`

- Source of truth for icons (`icons/raw`)
- Optimized output (`icons/optimized`)
- Metadata registry (`metadata/icons.ts`)
- Generated artifacts:
  - `generated/icons.json`
  - `generated/icon-manifest.json`
  - `generated/icons.ts`

### `@thinicons/react`

- Generated React components with `forwardRef`
- Tree-shakeable named exports
- Shared `IconBase` for consistent behavior

Supported props:

- `size`
- `width`
- `height`
- `color`
- `strokeWidth`
- `className`
- `variant` (`outline | solid | soft | duotone`)

Example:

```tsx
import { HomeIcon } from '@thinicons/react';

export function Example() {
  return <HomeIcon size={24} strokeWidth={1.75} variant="outline" className="text-black" />;
}
```

### `@thinicons/cli`

Commands:

- `thinicons generate [iconName]`
- `thinicons optimize`
- `thinicons build`
- `thinicons export <iconName> --format svg|jsx|json --out ./dir`
- `thinicons list`

## Icon Design Contract

All icons follow:

- Grid: `24x24`
- Default stroke width: `1.75`
- `strokeLinecap="round"`
- `strokeLinejoin="round"`
- Clean geometry and consistent padding

## CDN Usage

Raw optimized SVG example:

```txt
https://cdn.jsdelivr.net/npm/@thinicons/core@latest/icons/optimized/home.svg
https://unpkg.com/@thinicons/core@latest/icons/optimized/home.svg
```

React ESM example endpoint:

```txt
https://esm.sh/@thinicons/react@latest
```

## Local Development

### Prerequisites

- Node.js 18+ (Node 20+ recommended)

### Install dependencies

If you already have `pnpm`:

```bash
pnpm install
```

If `pnpm` is not installed globally:

```bash
npm exec --yes pnpm@9.12.3 -- install
```

### Run all apps/packages in dev mode

With pnpm:

```bash
pnpm dev
```

Without global pnpm:

```bash
npm exec --yes pnpm@9.12.3 -- dev
```

### Run docs app only

With pnpm:

```bash
pnpm --filter @thinicons/docs dev -- --hostname 0.0.0.0 --port 4000
```

Without global pnpm:

```bash
npm exec --yes pnpm@9.12.3 -- --filter @thinicons/docs dev -- --hostname 0.0.0.0 --port 4000
```

### Generate icons/components

With pnpm:

```bash
pnpm generate
```

Without global pnpm:

```bash
npm exec --yes pnpm@9.12.3 -- generate
```

### Quality checks

With pnpm:

```bash
pnpm lint
pnpm typecheck
pnpm format
```

Without global pnpm:

```bash
npm exec --yes pnpm@9.12.3 -- lint
npm exec --yes pnpm@9.12.3 -- typecheck
npm exec --yes pnpm@9.12.3 -- format
```

### Build everything

With pnpm:

```bash
pnpm build
```

Without global pnpm:

```bash
npm exec --yes pnpm@9.12.3 -- build
```

## HTML Example

Use the included file:

- `examples/vanilla-no-node.html`

Open it directly in a browser, or serve it from a static server.

## Adding a New Icon

1. Add SVG to `packages/core/icons/raw`.
2. Add metadata in `packages/core/metadata/icons.ts`.
3. Run generation:
   - `pnpm --filter @thinicons/core generate`
   - `pnpm --filter @thinicons/react generate`
4. Validate in docs explorer (`/icons`).
5. Run `lint`, `typecheck`, and `build`.

## Publishing

This repo uses Changesets.

```bash
pnpm changeset
pnpm release
```

Published packages:

- `@thinicons/core`
- `@thinicons/react`
- `@thinicons/cli`

Package readiness:

- `sideEffects: false`
- ESM outputs
- Typed exports
- Tree-shakeable entry points

## Troubleshooting

### `pnpm` is not recognized

Use:

```bash
npm exec --yes pnpm@9.12.3 -- <command>
```

Example:

```bash
npm exec --yes pnpm@9.12.3 -- build
```

### Module not found: `@thinicons/core` in docs

Build/generate workspace packages first:

```bash
npm exec --yes pnpm@9.12.3 -- --filter @thinicons/core build
npm exec --yes pnpm@9.12.3 -- --filter @thinicons/react build
```

Then run docs again.

### Hydration warning caused by browser extensions

Some Chrome extensions inject attributes before React hydration. The docs app root layout is configured with hydration warning suppression for this case.

### Port already in use

Run docs on another port:

```bash
npm exec --yes pnpm@9.12.3 -- --filter @thinicons/docs dev -- --port 4010
```

## Roadmap

### V1

- Monorepo foundation
- Core/React/CLI packages
- Docs playground
- npm release pipeline

### V2

- Expand icon set
- Improve CLI export workflows
- Add richer icon variants

### V3

- Optional AI-assisted authoring workflows
- AI supports the ecosystem, never replaces the core product

## License

MIT
