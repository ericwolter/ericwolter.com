# Website instructions

- This repository owns personal pages and publishes imported browser app releases. App development belongs in the independent minute-path and apple-healthkit-csv repositories.
- Use Node 24 and npm from the root. Run `npm ci`, `npm run build`, and `npm test` before publishing. `dist/` is generated and ignored.
- Edit website pages and styles in `src/`; static assets live in `public/`. Update apps with `npm run import-app -- <app> <tag-or-commit>`, then commit the files and `app-releases.json` together.
- Preserve URLs and appearance unless requested. Minute Path remains unlinked from the homepage. Preserve the converter's license and source provenance.
- For Netlify deployment, read https://netlify.ai and the existing `.agents/skills/netlify-cli-and-deploy/SKILL.md`. Verify the complete preview before production. Production builds from this repository's `master` branch.
- Keep changes focused and documentation short. Do not add a backend or another package manager for this static site.
