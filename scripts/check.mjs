import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const apps = {
  'minute-path': { repository: 'https://github.com/ericwolter/minute-path', path: '/project/minute-path/' },
  'apple-healthkit-csv': { repository: 'https://github.com/ericwolter/apple-healthkit-csv', path: '/projects/apple-health-export/' },
};
export const requiredPages = ['index.html', 'impressum/index.html', 'support/rowsync/index.html',
  'privacy/rowsync/index.html', 'privacy/simple-health-export-csv/index.html',
  'privacy/stromlampe/index.html', 'privacy/molicula/index.html', 'projects/health-export.html'];
export const sha256 = data => createHash('sha256').update(data).digest('hex');

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink: ${path}`);
    return entry.isDirectory() ? files(path) : [path];
  });
}

export function check(root, output = true) {
  const manifest = JSON.parse(readFileSync(join(root, 'app-releases.json'), 'utf8'));
  if (Object.keys(manifest).sort().join() !== Object.keys(apps).sort().join()) throw new Error('Both app releases are required');
  for (const [name, definition] of Object.entries(apps)) {
    const release = manifest[name];
    if (release.repository !== definition.repository || release.path !== definition.path || !release.ref ||
        !/^[a-f0-9]{40}$/.test(release.commit) || !release.files['index.html']) throw new Error(`Invalid release metadata: ${name}`);
    const directory = join(root, 'public', definition.path);
    const actual = files(directory).map(f => relative(directory, f)).sort();
    if (actual.join() !== Object.keys(release.files).sort().join()) throw new Error(`Unexpected or missing release files: ${name}`);
    for (const [file, hash] of Object.entries(release.files)) {
      if (sha256(readFileSync(join(directory, file))) !== hash) throw new Error(`Release checksum mismatch: ${name}/${file}`);
      if (output && sha256(readFileSync(join(root, 'dist', definition.path, file))) !== hash) throw new Error(`Published release mismatch: ${name}/${file}`);
    }
  }
  if (!output) return;
  const dist = join(root, 'dist');
  for (const page of requiredPages) readFileSync(join(dist, page));
  for (const page of files(dist).filter(f => f.endsWith('.html'))) {
    for (const match of readFileSync(page, 'utf8').matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
      const reference = match[1];
      if (!reference.startsWith('/') || reference.startsWith('//')) continue;
      const path = reference.split(/[?#]/)[0];
      let target = resolve(dist, `.${path}`);
      if (target !== dist && !target.startsWith(dist + '/')) throw new Error(`Invalid local URL: ${reference}`);
      try { if (statSync(target).isDirectory()) target = join(target, 'index.html'); readFileSync(target); }
      catch { throw new Error(`Missing local resource: ${relative(dist, page)} -> ${reference}`); }
    }
  }
  console.log('Verified required pages, local references and both app releases.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) check(process.cwd());
