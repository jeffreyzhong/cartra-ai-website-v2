import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '../app');
const publicRoot = path.resolve(__dirname, '../public');
const repoRoot = path.resolve(__dirname, '../../..');

const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.mdx',
  '.svg',
  '.ts',
  '.tsx',
  '.txt',
]);

const blockedPatterns = [
  { label: 'Ahrefs references', pattern: /\bahrefs\b/i },
  { label: 'keyword difficulty fields', pattern: /\bkeywordDifficulty\b/ },
  { label: 'raw search volume metrics', pattern: /\bUS searches\/mo\b/i },
  { label: 'keyword difficulty metrics', pattern: /\bKD\s*\d+\b/i },
  { label: 'CPC metrics', pattern: /\bCPC\b/i },
  { label: 'search demand labels', pattern: /\bsearch demand\b/i },
  { label: 'paid intent labels', pattern: /\bpaid intent\b/i },
  { label: 'search intent labels', pattern: /\bsearch intent\b/i },
  { label: 'planning-library copy', pattern: /\bstarting library\b/i },
  { label: 'future-content planning copy', pattern: /\bfuture deeper\b/i },
  { label: 'partner-mentions planning copy', pattern: /\bpartner mentions\b/i },
  { label: 'content brief copy', pattern: /\bcontent brief\b/i },
  { label: 'target keyword copy', pattern: /\btarget keywords?\b/i },
];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const filePath = path.join(dir, entry);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      return walk(filePath);
    }

    if (!stats.isFile() || !textExtensions.has(path.extname(filePath))) {
      return [];
    }

    return [filePath];
  });
}

const findings = [];

for (const filePath of [...walk(appRoot), ...walk(publicRoot)]) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const [index, line] of lines.entries()) {
    for (const { label, pattern } of blockedPatterns) {
      if (pattern.test(line)) {
        findings.push({
          label,
          line: index + 1,
          path: path.relative(repoRoot, filePath),
          text: line.trim(),
        });
      }
    }
  }
}

if (findings.length > 0) {
  console.error('Public copy leakage check failed:');
  for (const finding of findings) {
    console.error(
      `- ${finding.path}:${finding.line} [${finding.label}] ${finding.text}`,
    );
  }
  process.exit(1);
}

console.log('Public copy leakage check passed.');
