import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { check } from './check.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'website-check-'));
  for (const name of ['public', 'dist', 'app-releases.json']) cpSync(name, join(root, name), { recursive: true });
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}
test('complete published site passes', t => check(fixture(t)));
test('missing converter prevents publication', t => {
  const root = fixture(t);
  rmSync(join(root, 'dist/projects/apple-health-export'), { recursive: true });
  assert.throws(() => check(root));
});
test('missing converter release prevents a build', t => {
  const root = fixture(t);
  rmSync(join(root, 'public/projects/apple-health-export'), { recursive: true });
  assert.throws(() => check(root, false));
});
test('edited release fails checksum check', t => {
  const root = fixture(t);
  writeFileSync(join(root, 'public/project/minute-path/index.html'), 'changed');
  assert.throws(() => check(root, false), /checksum mismatch/);
});
test('broken local asset prevents publication', t => {
  const root = fixture(t);
  const page = join(root, 'dist/index.html');
  writeFileSync(page, readFileSync(page, 'utf8') + '<img src="/missing.png">');
  assert.throws(() => check(root), /Missing local resource/);
});
test('missing support page prevents publication', t => {
  const root = fixture(t);
  rmSync(join(root, 'dist/support/rowsync/index.html'));
  assert.throws(() => check(root));
});
