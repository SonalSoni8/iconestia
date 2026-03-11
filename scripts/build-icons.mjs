import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_DIR = path.join(ROOT, 'icons');
const DIST_DIR = path.join(ROOT, 'dist');

function extractViewBox(svg) {
  const m = svg.match(/viewBox\s*=\s*"([^"]+)"/i);
  return m?.[1] || '0 0 24 24';
}

function extractBody(svg) {
  const m = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  return m?.[1]?.trim() || '';
}

async function collectIcons() {
  let files = [];
  try {
    files = await fs.readdir(ICONS_DIR);
  } catch {
    return [];
  }

  const icons = [];
  for (const file of files) {
    if (!file.endsWith('.svg')) continue;

    const name = path.basename(file, '.svg');
    const content = await fs.readFile(path.join(ICONS_DIR, file), 'utf8');
    const body = extractBody(content);

    if (!body) continue;

    icons.push({
      name,
      viewBox: extractViewBox(content),
      body,
    });
  }

  return icons;
}

function buildSprite(icons) {
  const symbols = icons
    .map(
      (icon) =>
        `<symbol id="icon-${icon.name}" viewBox="${icon.viewBox}">${icon.body}</symbol>`,
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs>${symbols}</defs></svg>`;
}

async function main() {
  const icons = await collectIcons();

  await fs.mkdir(DIST_DIR, { recursive: true });
  await fs.writeFile(path.join(DIST_DIR, 'sprite.svg'), buildSprite(icons), 'utf8');

  const manifest = Object.fromEntries(
    icons.map((icon) => [
      icon.name,
      {
        viewBox: icon.viewBox,
        body: icon.body,
      },
    ]),
  );

  await fs.writeFile(
    path.join(DIST_DIR, 'icons.json'),
    JSON.stringify(manifest, null, 2),
    'utf8',
  );

  console.log(`Built ${icons.length} icon(s) into dist/.`);
}

main();
