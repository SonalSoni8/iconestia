const SPRITE_ID = 'iconestia-sprite';
const DEFAULT_VIEWBOX = '0 0 24 24';

let externalSpriteUrl = null;
const customIcons = new Map();

function ensureSpriteRoot() {
  if (typeof document === 'undefined') return null;

  let sprite = document.getElementById(SPRITE_ID);
  if (sprite) return sprite;

  sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sprite.setAttribute('id', SPRITE_ID);
  sprite.setAttribute('aria-hidden', 'true');
  sprite.style.position = 'absolute';
  sprite.style.width = '0';
  sprite.style.height = '0';
  sprite.style.overflow = 'hidden';

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  sprite.appendChild(defs);
  document.body.prepend(sprite);

  return sprite;
}

function spriteDefs() {
  const sprite = ensureSpriteRoot();
  if (!sprite) return null;
  return sprite.querySelector('defs');
}

function upsertSymbol({ name, body, viewBox = DEFAULT_VIEWBOX }) {
  const defs = spriteDefs();
  if (!defs || !name || !body) return;

  const id = `icon-${name}`;
  let symbol = defs.querySelector(`#${CSS.escape(id)}`);

  if (!symbol) {
    symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
    symbol.setAttribute('id', id);
    defs.appendChild(symbol);
  }

  symbol.setAttribute('viewBox', viewBox);
  symbol.innerHTML = body;
}

export function setExternalSprite(url) {
  externalSpriteUrl = url;
}

export function registerIcons(iconSet = {}) {
  const entries = Array.isArray(iconSet)
    ? iconSet.map((icon) => [icon.name, icon])
    : Object.entries(iconSet).map(([name, icon]) => [name, { name, ...icon }]);

  for (const [name, icon] of entries) {
    if (!name || !icon?.body) continue;
    customIcons.set(name, {
      body: icon.body,
      viewBox: icon.viewBox || DEFAULT_VIEWBOX,
    });
    upsertSymbol({ name, body: icon.body, viewBox: icon.viewBox });
  }
}

function hrefForIcon(name) {
  if (customIcons.has(name) || !externalSpriteUrl) {
    return `#icon-${name}`;
  }

  return `${externalSpriteUrl}#icon-${name}`;
}

export class IconestiaIcon extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'size', 'stroke', 'fill', 'title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name');
    if (!name) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    const size = this.getAttribute('size') || '1em';
    const stroke = this.getAttribute('stroke') || 'currentColor';
    const fill = this.getAttribute('fill') || 'none';
    const title = this.getAttribute('title');

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; line-height: 0; }
        svg { width: ${size}; height: ${size}; stroke: ${stroke}; fill: ${fill}; }
      </style>
      <svg viewBox="${DEFAULT_VIEWBOX}" aria-hidden="${title ? 'false' : 'true'}" role="img">
        ${title ? `<title>${title}</title>` : ''}
        <use href="${hrefForIcon(name)}"></use>
      </svg>
    `;
  }
}

export function defineIconElement(tagName = 'iconestia-icon') {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get(tagName)) {
    customElements.define(tagName, IconestiaIcon);
  }
}
