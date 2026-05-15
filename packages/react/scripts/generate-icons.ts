import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { transform } from '@svgr/core';

interface CoreIconMetadata {
  name: string;
  componentName: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const corePackageRoot = path.resolve(packageRoot, '..', 'core');

const coreMetadataPath = path.join(corePackageRoot, 'generated', 'icons.json');
const coreOptimizedDir = path.join(corePackageRoot, 'icons', 'optimized');
const iconsOutDir = path.join(packageRoot, 'src', 'icons');

const extractChildren = (svgrOutput: string): string => {
  const svgMatch = svgrOutput.match(/<svg[\s\S]*<\/svg>/);
  if (!svgMatch) {
    throw new Error('Unable to locate <svg> in SVGR output.');
  }

  const childrenMatch = svgMatch[0].match(/^<svg[^>]*>([\s\S]*)<\/svg>$/);
  const children = childrenMatch?.[1];
  if (!children) {
    throw new Error('Unable to extract SVG children.');
  }

  return children.trim().replace(/></g, '>\n<');
};

const createComponentSource = (componentName: string, children: string): string => {
  const childrenLines = children
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');

  return `import { forwardRef } from 'react';\nimport { IconBase } from '../icon-base';\nimport type { ThinIconProps } from '../types';\n\nconst ${componentName} = forwardRef<SVGSVGElement, ThinIconProps>((props, ref) => (\n  <IconBase ref={ref} {...props}>\n${childrenLines}\n  </IconBase>\n));\n\n${componentName}.displayName = '${componentName}';\n\nexport { ${componentName} };\n`;
};

const generateIcons = async (): Promise<void> => {
  const metadataRaw = await fs.readFile(coreMetadataPath, 'utf8');
  const metadata = JSON.parse(metadataRaw) as CoreIconMetadata[];

  await fs.mkdir(iconsOutDir, { recursive: true });

  const existingFiles = await fs.readdir(iconsOutDir);
  await Promise.all(
    existingFiles
      .filter((file) => file.endsWith('.tsx') || file === 'index.ts')
      .map((file) => fs.rm(path.join(iconsOutDir, file), { force: true })),
  );

  const exportLines: string[] = [];

  for (const icon of metadata) {
    const fileName = `${icon.name}.svg`;
    const svgPath = path.join(coreOptimizedDir, fileName);
    const svg = await fs.readFile(svgPath, 'utf8');

    const svgrOutput = await transform(
      svg,
      {
        typescript: true,
        jsxRuntime: 'automatic',
        expandProps: false,
        svgo: false,
        plugins: ['@svgr/plugin-jsx', '@svgr/plugin-svgo'],
      },
      { componentName: 'SvgComponent', filePath: svgPath },
    );

    const children = extractChildren(svgrOutput);
    const componentSource = createComponentSource(icon.componentName, children);

    await fs.writeFile(path.join(iconsOutDir, `${icon.componentName}.tsx`), componentSource, 'utf8');
    exportLines.push(`export { ${icon.componentName} } from './${icon.componentName}';`);
  }

  await fs.writeFile(path.join(iconsOutDir, 'index.ts'), `${exportLines.sort().join('\n')}\n`, 'utf8');

  console.log(`Generated ${metadata.length} React icon components.`);
};

generateIcons().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
