import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { apps, sha256 } from './check.mjs';

const [name, ref, sourceArgument] = process.argv.slice(2);
if (!apps[name] || !ref || ref.startsWith('-') || process.argv.length > 5) {
  throw new Error('Usage: npm run import-app -- {minute-path|apple-healthkit-csv} <tag-or-commit> [source-repository]');
}
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(sourceArgument || join(root, '..', name));
const commit = execFileSync('git', ['-C', source, 'rev-parse', '--verify', `${ref}^{commit}`], { encoding: 'utf8' }).trim();
if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('Expected a Git commit');
const scratch = mkdtempSync(join(tmpdir(), `website-${name}-`));
try {
  const archive = execFileSync('git', ['-C', source, 'archive', commit], { maxBuffer: 20 * 1024 * 1024 });
  execFileSync('tar', ['-xf', '-', '-C', scratch], { input: archive });
  let release = scratch;
  if (name === 'apple-healthkit-csv') {
    execFileSync('npm', ['ci', '--ignore-scripts'], { cwd: scratch, stdio: 'inherit' });
    execFileSync('npm', ['run', 'build'], { cwd: scratch, stdio: 'inherit' });
    release = join(scratch, 'dist');
  }
  const index = readFileSync(join(release, 'index.html'));
  const destination = join(root, 'public', apps[name].path);
  const hashes = { 'index.html': sha256(index) };
  const license = join(scratch, 'LICENSE');
  if (existsSync(license)) hashes.LICENSE = sha256(readFileSync(license));
  const manifestPath = join(root, 'app-releases.json');
  const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
  rmSync(destination, { recursive: true, force: true });
  mkdirSync(destination, { recursive: true });
  writeFileSync(join(destination, 'index.html'), index);
  if (hashes.LICENSE) cpSync(license, join(destination, 'LICENSE'));
  manifest[name] = { ...apps[name], ref, commit, files: hashes };
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Imported ${name} ${ref} (${commit.slice(0, 7)}). Review, build and preview the website before publishing.`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
