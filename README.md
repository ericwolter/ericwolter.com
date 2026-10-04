# ericwolter.com

Personal website and publication of selected browser app releases. A normal website build needs no submodules, sibling repositories, Bun, or app builds.

## Develop and build

Use Node.js 24 (see `.nvmrc`), then:

```sh
npm ci
npm run dev
```

For a complete production build and regression checks:

```sh
npm run build
npm test
```

`src/` owns website pages, layouts and styles. `public/` contains unchanged static assets and published app files. Eleventy writes the complete site to ignored `dist/`. The build refuses missing or changed app releases and checks required pages and local links.

## Publish an app release

Develop Minute Path and the browser health converter in their own repositories. Do not edit their imported files here. The HealthExportCSV iOS app is a separate product.

From this website folder, import a committed release:

```sh
npm run import-app -- minute-path v1.2.1
npm run import-app -- apple-healthkit-csv <tag-or-commit>
npm run build
npm test
```

The importer defaults to sibling repositories in `~/Projects`; an optional third argument selects another source checkout. It reads the chosen committed version, builds the converter in a temporary directory, copies only finished files and its license, and records the repository, exact commit and checksums in `app-releases.json`. Uncommitted source edits are excluded. Review and commit the imported files and manifest together.

Keep the routes `/project/minute-path/` and `/projects/apple-health-export/`. Minute Path is intentionally unlinked from the homepage.

## Deploy

Netlify builds this repository's `master` branch with `npm run build` and publishes `dist/`. The checked-in `netlify.toml` owns build configuration. Verify a complete preview before pushing production changes. Normal production releases come from Git; a push to an app repository alone does not publish its website copy.

## Dependency maintenance

Update supported package versions and verify the full build. The current Eleventy dependency tree has a build-time `braces` advisory; npm's suggested downgrade to Eleventy 0.6 is not a suitable fix. The published site contains static files, not these build dependencies. Recheck advisories when updating dependencies.
