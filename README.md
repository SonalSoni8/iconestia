# Iconestia

A framework-agnostic icon library starter that works in:

- plain HTML
- React
- Angular
- Vue/Svelte
- .NET Blazor/Razor pages

The core idea is simple:

1. Keep icons as raw SVG files in `/icons`.
2. Build them into a sprite + JSON manifest.
3. Use one custom element (`<iconestia-icon>`) or register project-specific icons at runtime.

## Why this pattern works everywhere

`<iconestia-icon>` is a standard Web Component. Any framework that can render HTML can use it.

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
  import { defineIconElement, setExternalSprite } from './src/iconestia.js';

  defineIconElement();
  setExternalSprite('/dist/sprite.svg');
</script>

<iconestia-icon name="bolt" size="24px"></iconestia-icon>
<iconestia-icon name="leaf" size="32px" stroke="#16a34a"></iconestia-icon>
```

## React usage

```jsx
import { useEffect } from 'react';
import { defineIconElement, setExternalSprite } from 'iconestia';

export function App() {
  useEffect(() => {
    defineIconElement();
    setExternalSprite('/icons/sprite.svg');
  }, []);

  return <iconestia-icon name="bolt" size="20px" />;
}
```

## Angular usage

1. Call `defineIconElement()` once in `main.ts`.
2. Add `CUSTOM_ELEMENTS_SCHEMA` in your module/component schema.
3. Use `<iconestia-icon name="leaf"></iconestia-icon>` in templates.

## .NET Blazor usage

Use the element directly in `.razor`:

```razor
<iconestia-icon name="bolt" size="24px"></iconestia-icon>
```

Then load your module in `index.html` / `_Layout.cshtml` and call `defineIconElement()`.

## Project-specific custom icons (the "twist")

If each project needs extra custom icons, register them at runtime:

```js
import { defineIconElement, registerIcons } from 'iconestia';

defineIconElement();

registerIcons({
  companyLogo: {
    viewBox: '0 0 24 24',
    body: '<path d="M3 12h18M12 3v18" />'
  }
});
```

Now use it the same way:

```html
<iconestia-icon name="companyLogo"></iconestia-icon>
```

## Distribution options

- **npm package**: publish this repo as-is.
- **CDN**: publish `dist/sprite.svg` and ESM entry file (`src/iconestia.js`) to a static host.
- **File download**: zip `dist/` and share with teams.

## Add new icons

1. Drop SVG files into `/icons` (e.g., `camera.svg`).
2. Run `npm run build`.
3. Use `name="camera"` anywhere.

## API

- `defineIconElement(tagName = 'iconestia-icon')`
- `setExternalSprite(url)`
- `registerIcons(iconMap | iconArray)`

