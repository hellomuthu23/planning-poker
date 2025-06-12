import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

delete process.env['CommonProgramFiles(x86)'];
delete process.env['ProgramFiles(x86)'];
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), EnvironmentPlugin('all')],
  build: {
    outDir: 'build',
  },
});
