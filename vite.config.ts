import { crx, defineManifest } from '@crxjs/vite-plugin';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { manifest as _manifest } from './src/manifest';

const manifest = defineManifest(_manifest);

const root = resolve(__dirname, 'src');
// const assetsDir = resolve(__dirname, 'assets');
// const outDir = resolve(__dirname, "dist");
// const publicDir = resolve(__dirname, "public");
// const isDev = process.env.__DEV__ === "true";

export default defineConfig({
  plugins: [solidPlugin(), crx({ manifest })],
  resolve: {
    alias: {
      '@': root,
    },
  },
  // publicDir,
  // build: {
  //   outDir,
  //   sourcemap: isDev,
  // }
});
