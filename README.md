# Iconestia

A framework-agnostic icon library starter that works in:

- plain HTML
- React
- Angular
- Vue/Svelte
- .NET Blazor/Razor pages

The core idea is simple:

1. Keep shared icons as raw SVG files in `/icons`.
2. Build them into a sprite + JSON manifest.
3. Let every consumer project add its own custom icons with zero rebuild.

## Why this works for "shared + project custom" icons

You can combine **both** strategies at the same time:

- `setExternalSprite('/dist/sprite.svg')` for your shared team/company icon pack.
- `registerIcons(...)`, `addIconFromSvg(...)`, or `loadIconsFromUrl(...)` for project-local custom icons.

When a project icon name is registered locally, it wins automatically.

## Quick start

```bash
npm install
npm run build
```

This generates:

- `dist/sprite.svg` (for CDN/static hosting)
- `dist/icons.json` (manifest for runtime registration)

## HTML usage

```html
<script type="module">
  import {
    defineIconElement,
    setExternalSprite,
    registerIcons
  } from './src/iconestia.js';

  defineIconElement();

  // 1) Shared icon set from CDN/static host
  setExternalSprite('/dist/sprite.svg');

  // 2) Project-specific custom icon (no package rebuild needed)
  registerIcons({
    projectBadge: {
      viewBox: '0 0 24 24',
      body: '<circle cx="12" cy="12" r="9" /><path d="M8 12h8" />'
    }
  });
</script>

<iconestia-icon name="bolt" size="24px" color="#2563eb"></iconestia-icon>
<iconestia-icon name="projectBadge" size="28px" stroke="#16a34a"></iconestia-icon>
```

## React usage

```jsx
import { useEffect } from 'react';
import {
  defineIconElement,
  setExternalSprite,
  loadIconsFromUrl
} from 'iconestia';

export function App() {
  useEffect(() => {
    defineIconElement();
    setExternalSprite('/icons/sprite.svg');

    // optional: load project-specific icons from JSON
    loadIconsFromUrl('/project-icons/icons.json');
  }, []);

  return <iconestia-icon name="bolt" size="20px" />;
}
```

## Angular usage

1. Call `defineIconElement()` once in `main.ts`.
2. Add `CUSTOM_ELEMENTS_SCHEMA` in your module/component schema.
3. Use `<iconestia-icon name="leaf"></iconestia-icon>` in templates.
4. Register project-specific icons in a service or app initializer.

## .NET Blazor usage

Use the element directly in `.razor`:

```razor
<iconestia-icon name="bolt" size="24px"></iconestia-icon>
```

Then load your module in `index.html` / `_Layout.cshtml`, call `defineIconElement()`, and optionally load project icon JSON.

## Project-specific custom icons (the key workflow)

### Option A: Register inline icon data

```js
import { registerIcons } from 'iconestia';

registerIcons({
  companyLogo: {
    viewBox: '0 0 24 24',
    body: '<path d="M3 12h18M12 3v18" />'
  }
});
```

### Option B: Add from a full SVG string

```js
import { addIconFromSvg } from 'iconestia';

addIconFromSvg('customRocket', `
  <svg viewBox="0 0 24 24">
    <path d="M5 19c4-1 7-4 8-8l6-6-1-1-6 6c-4 1-7 4-8 8h1z"/>
  </svg>
`);
```

### Option C: Load a project JSON manifest

```js
import { loadIconsFromUrl } from 'iconestia';

await loadIconsFromUrl('/project-icons/icons.json');
```

Then use all icons with the same element (including size/color customization):

```html
<iconestia-icon name="companyLogo" size="20px" color="#7c3aed"></iconestia-icon>
<iconestia-icon name="customRocket" size="32px" stroke="#dc2626" fill="none"></iconestia-icon>
```

## Distribution options

- **npm package**: publish this repo as-is.
- **CDN**: publish `dist/sprite.svg` and ESM entry file (`src/iconestia.js`) to a static host.
- **File download**: zip `dist/` and share with teams.

## Add new shared icons

1. Drop SVG files into `/icons` (e.g., `camera.svg`).
2. Run `npm run build`.
3. Use `name="camera"` anywhere.

## API

- `defineIconElement(tagName = 'iconestia-icon')`
- `setExternalSprite(url)`
- `registerIcons(iconMap | iconArray) => string[]`
- `addIconFromSvg(name, svgString) => boolean`
- `loadIconsFromUrl(url) => Promise<string[]>`

`<iconestia-icon>` attributes:
- `name` (required)
- `size` (e.g. `20px`, `1.5rem`)
- `color` (applies as default icon color)
- `stroke` (overrides stroke color)
- `fill`
- `title`
- `viewbox` (optional override when needed)

