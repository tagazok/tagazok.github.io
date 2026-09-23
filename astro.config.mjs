import { defineConfig } from 'astro/config';
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * The page data (conferences / videos / articles) is imported at build time and
 * inlined into the pre-rendered HTML, so the raw JSON files never need to ship.
 * They only reach dist/ because public/assets is a whole-tree symlink; strip the
 * unused data/ folder from the build output so nothing dead is published.
 */
function stripUnusedData() {
  return {
    name: 'strip-unused-data',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const target = new URL('assets/data/', dir);
        await rm(fileURLToPath(target), { recursive: true, force: true });
        logger.info('removed unused assets/data from build output');
      },
    },
  };
}

export default defineConfig({
  site: 'https://tagazok.github.io',
  output: 'static',
  // /talks used to be the route; it now lives at /conferences. Redirect the old
  // path so existing links keep working.
  redirects: {
    '/talks': '/conferences',
  },
  integrations: [stripUnusedData()],
  vite: {
    build: {
      target: 'es2020',
    },
  },
});
