import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';

// Get the repository name from the 'homepage' field in your package.json
const repoName = new URL(packageJson.homepage).pathname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This 'base' option is the crucial part for GitHub Pages to work correctly.
  base: repoName,
});

