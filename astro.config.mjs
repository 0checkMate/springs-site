import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Replace with the real domain before launch (used for canonical URLs and the sitemap).
export default defineConfig({
  site: 'https://www.example.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
