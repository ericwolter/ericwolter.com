#!/usr/bin/env bash
set -euo pipefail

rm -rf "dist/"

if ! command -v bun >/dev/null 2>&1; then
  printf 'Bun is required to build the personal site.\n' >&2
  exit 1
fi

pushd personal/ >/dev/null
bun install
bun run build
popd >/dev/null

if [ ! -f "apple-healthkit-csv/deploy.sh" ]; then
  printf 'Skipping apple-healthkit-csv deploy step; submodule is not initialized.\n'
  exit 0
fi

pushd apple-healthkit-csv/ >/dev/null
npm install
./deploy.sh
popd >/dev/null
