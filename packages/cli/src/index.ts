#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Command } from 'commander';

interface IconRecord {
  name: string;
  componentName: string;
  title: string;
  category: string;
  tags: string[];
  terms?: string[];
  svg: string;
}

interface ExportOptions {
  format?: 'svg' | 'jsx' | 'json';
  out?: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../..');
const generatedIconsPath = path.join(workspaceRoot, 'packages', 'core', 'generated', 'icons.json');

const run = async (command: string, args: string[]): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: workspaceRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'unknown'}`));
      }
    });
  });
};

const runCoreOptimize = async (): Promise<void> => {
  await run('pnpm', ['--filter', '@thinicons/core', 'generate']);
};

const runReactGenerate = async (): Promise<void> => {
  await run('pnpm', ['--filter', '@thinicons/react', 'generate']);
};

const readIcons = async (): Promise<IconRecord[]> => {
  const data = await fs.readFile(generatedIconsPath, 'utf8');
  return JSON.parse(data) as IconRecord[];
};

const ensureIconExists = (icons: IconRecord[], iconName: string): IconRecord => {
  const icon = icons.find((entry) => entry.name === iconName);
  if (!icon) {
    const known = icons.map((entry) => entry.name).join(', ');
    throw new Error(`Unknown icon "${iconName}". Available icons: ${known}`);
  }

  return icon;
};

const exportIcon = async (iconName: string, options: ExportOptions): Promise<void> => {
  const icons = await readIcons();
  const icon = ensureIconExists(icons, iconName);
  const format = options.format ?? 'svg';

  let payload = '';
  let extension = '';

  if (format === 'svg') {
    payload = icon.svg;
    extension = 'svg';
  }

  if (format === 'jsx') {
    payload = `import { ${icon.componentName} } from '@thinicons/react';\n\n<${icon.componentName} size={24} strokeWidth={1.75} />;\n`;
    extension = 'tsx';
  }

  if (format === 'json') {
    payload = `${JSON.stringify(icon, null, 2)}\n`;
    extension = 'json';
  }

  if (!options.out) {
    console.log(payload);
    return;
  }

  const outputDir = path.resolve(process.cwd(), options.out);
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${icon.name}.${extension}`);
  await fs.writeFile(outputPath, payload, 'utf8');
  console.log(`Exported ${icon.name} (${format}) -> ${outputPath}`);
};

const generateCommand = async (iconName?: string): Promise<void> => {
  await runCoreOptimize();
  await runReactGenerate();

  if (!iconName) {
    console.log('Generated Thinicons core + React packages.');
    return;
  }

  const icons = await readIcons();
  const icon = ensureIconExists(icons, iconName);
  console.log(`Generated ${icon.name} via full-pipeline rebuild for consistency.`);
};

const listIcons = async (): Promise<void> => {
  const icons = await readIcons();
  for (const icon of icons) {
    console.log(`${icon.name} (${icon.componentName})`);
  }
};

const program = new Command();

program.name('thinicons').description('Thinicons CLI').version('0.1.0');

program
  .command('generate')
  .description('Generate optimized core metadata and React components. Optionally pass a single icon name.')
  .argument('[iconName]', 'optional icon name (for validation/targeted workflow)')
  .action(generateCommand);

program
  .command('optimize')
  .description('Optimize raw SVG files and regenerate core manifest')
  .action(runCoreOptimize);

program
  .command('build')
  .description('Run full generation and build for core/react packages')
  .action(async () => {
    await runCoreOptimize();
    await runReactGenerate();
    await run('pnpm', ['--filter', '@thinicons/core', 'build']);
    await run('pnpm', ['--filter', '@thinicons/react', 'build']);
  });

program
  .command('export')
  .description('Export a specific icon as SVG, JSX snippet, or JSON metadata')
  .argument('<iconName>', 'icon name to export')
  .option('-f, --format <format>', 'svg | jsx | json', 'svg')
  .option('-o, --out <directory>', 'output directory (prints to stdout when omitted)')
  .action((iconName: string, options: ExportOptions) => exportIcon(iconName, options));

program.command('list').description('List all available icon names').action(listIcons);

program.parseAsync(process.argv).catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('Unexpected CLI error', error);
  }

  process.exitCode = 1;
});
