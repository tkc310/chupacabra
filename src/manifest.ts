import { SERVICE_NAME } from './constants';

export const manifest = {
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
      // matches: SUPPORTED_ORIGINS,
      matches: ['https://*/*'],
      js: ['src/scripts/content.ts'],
    },
  ],
};
