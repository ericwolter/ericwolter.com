import { rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { check } from './check.mjs';

check(process.cwd(), false);
rmSync('dist', { recursive: true, force: true });
execFileSync(process.execPath, ['node_modules/@11ty/eleventy/cmd.cjs'], { stdio: 'inherit' });
check(process.cwd());
