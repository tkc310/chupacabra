import { crx, defineManifest } from '@crxjs/vite-plugin';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { manifest as _manifest } from './src/manifest';

const manifest = defineManifest(_manifest);
const root = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [solidPlugin(), crx({ manifest })],
  resolve: {
    alias: {
      '@': root,
    },
  },
});
