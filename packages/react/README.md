# @thinicons/react

React component package for Thinicons.

## Features

- `forwardRef` icon components
- strict TypeScript typings
- tree-shakeable ESM exports
- shared `IconBase` with consistent defaults

## Props

- `size`
- `width`
- `height`
- `color`
- `strokeWidth`
- `className`
- `variant`

## Usage

```tsx
import { HomeIcon } from '@thinicons/react';

<HomeIcon size={24} strokeWidth={1.75} variant="outline" />;
```

## Commands

```bash
pnpm --filter @thinicons/react generate
pnpm --filter @thinicons/react build
pnpm --filter @thinicons/react typecheck
```
