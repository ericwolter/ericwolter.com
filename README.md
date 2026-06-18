# ericwolter.com

Personal website source for `ericwolter.com`.

## Local development

- Main site source lives in `personal/`.
- Install dependencies with `bun install`.
- Start the local dev server with `bun run serve`.
- Build the static site with `bun run build`.

Example:

```bash
cd personal
bun install
bun run serve
```

## Repository notes

- Built files are written to `dist/` at the repo root.
- `apple-healthkit-csv/` is a submodule used by the top-level `build.sh` script.
- The top-level build uses `bun` for `personal/` and `npm` for the submodule deploy script.
- If you need the submodule locally, initialize it with `git submodule update --init --recursive`.
