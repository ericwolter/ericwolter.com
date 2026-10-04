#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "apple-healthkit-csv/deploy.sh" ]; then
  printf 'Missing health converter source; refusing an incomplete website build.\n' >&2
  exit 1
fi

rm -rf "dist/"

if ! command -v bun >/dev/null 2>&1; then
  printf 'Bun is required to build the personal site.\n' >&2
  exit 1
fi

pushd personal/ >/dev/null
bun install
bun run build
popd >/dev/null

pushd apple-healthkit-csv/ >/dev/null
npm install
./deploy.sh
popd >/dev/null
