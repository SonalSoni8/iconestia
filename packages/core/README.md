# @thinicons/core

Core icon source package for Thinicons.

## Responsibilities

- Stores raw SVG icon files in `icons/raw`
- Optimizes SVG output to `icons/optimized`
- Maintains icon metadata registry in `metadata/icons.ts`
- Generates typed icon manifest artifacts in `generated/`

## Structure

```text
core/
+-- icons/
¦   +-- raw/
¦   +-- optimized/
+-- metadata/
+-- scripts/
+-- generated/
+-- src/
```

## Commands

```bash
pnpm --filter @thinicons/core generate
pnpm --filter @thinicons/core build
pnpm --filter @thinicons/core typecheck
```

## Exports

- `@thinicons/core`
- `@thinicons/core/generated/icons.json`
- `@thinicons/core/generated/icon-manifest.json`
- `@thinicons/core/icons/optimized/*`
- `@thinicons/core/icons/raw/*`

