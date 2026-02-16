import { defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
//import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: ['log'],
        arguments: true,
      },
    },

    rollupOptions: {
      output: {},
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    svgr({
      svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
  ],
  test: {
    globals: true,
    include: ['./src/**/*.test.(ts|tsx)'],
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    reporters: ['verbose'],
  },
  envPrefix: 'VITE_',
});
