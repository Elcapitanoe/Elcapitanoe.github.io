import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elcapitanoe.github.io',
  integrations: [sitemap()],
  server: {
    port: 5173,
    host: true
  }
});
