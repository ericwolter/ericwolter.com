# Repository Guidelines

This repository contains a personal site built with Eleventy, using Pug and Nunjucks templates plus static CSS and JS assets.

## Project Structure & Module Organization
- `index.pug` is the main homepage; `projects/` contains project-specific pages (for example `projects/health-export-redirect.pug`).
- `privacy/` holds Markdown privacy statements, and `impressum.njk` handles the imprint/legal page.
- `_includes/` stores shared layouts and partials such as `layout.pug` and `privacy.njk`.
- `css/` contains global styles (`_global.css`, `index.css`) and project-specific styles under `css/projects/`.
- `js/` is for client scripts; `img/` contains icons and other static assets.

## Build, Test, and Development Commands
- `bun install` installs Eleventy and its plugins.
- `bun run build` runs Eleventy to generate the static site (default output is `_site/`).
- `bun run serve` builds and serves locally with live reload for development.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for Pug, CSS, and JS; follow existing file patterns.
- Templates: use Pug for pages/layouts and Nunjucks for shared templates; keep markup readable and minimize inline scripts.
- Naming: prefer lowercase filenames with hyphens (for example `molicula-style.css`); use kebab-case for CSS classes.
- Styling: update shared colors and typography via CSS custom properties in `css/_global.css`.

## Testing Guidelines
- No automated tests are configured. Verify changes by running `bun run serve` and manually checking the homepage, project grid, and privacy pages.

## Commit & Pull Request Guidelines
- Commit messages are short, imperative, and sentence-case (for example "Update colors for 2025").
- Keep PRs focused and describe what changed and why; include before/after screenshots for visual updates.
- Link related issues if applicable.

## Configuration & Output Notes
- The site is static; generated output typically lives in `_site/` and should not be committed unless explicitly required.
- Do not edit `node_modules/`; update dependencies via `bun add`/`bun remove`, `package.json`, and `bun.lockb`.
