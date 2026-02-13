import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import yaml from '@modyfi/vite-plugin-yaml';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), yaml()],
  // Base path for GitHub Pages deployment (repo name)
  base: '/jonathan-drums/',
});
