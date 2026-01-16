// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://project_week_cyber.github.io',
  base: '/project_week',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
