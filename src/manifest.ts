import { ManifestV3Export } from '@crxjs/vite-plugin';
import { SERVICE_NAME, SUPPORTED_URLS } from './constants';

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: SERVICE_NAME,
  description: 'Tool to acquire property information from web pages',
  version: '1.0',
  icons: {
    '16': 'src/images/favicons/icon-16.png',
    '32': 'src/images/favicons/icon-32.png',
    '48': 'src/images/favicons/icon-48.png',
    '128': 'src/images/favicons/icon-128.png',
  },
  permissions: ['tabs', 'storage'],
  action: {
    default_title: SERVICE_NAME,
    default_popup: 'src/index.html',
  },
  content_scripts: [
    {
      // https://qiita.com/ledsun/items/4fbaee8e9397bb3e5321#%E5%80%A4%E3%81%94%E3%81%A8%E3%81%AE%E6%B3%A8%E5%85%A5%E3%81%AE%E3%82%BF%E3%82%A4%E3%83%9F%E3%83%B3%E3%82%B0
      // run_at: 'document_end',
      matches: SUPPORTED_URLS,
      js: ['src/scripts/content.ts'],
    },
  ],
};
