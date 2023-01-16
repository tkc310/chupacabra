export const SERVICE_NAME = 'Chupacabra';

export const SERVICE_KEY = SERVICE_NAME.toLocaleLowerCase();

export const SUPPORTED_ORIGINS = ['https://tkc310.com'];
export const SUPPORTED_URLS = SUPPORTED_ORIGINS.map((item) => `${item}/*`);

export const CHROME_MESSAGES = {
  EXECUTE: 'EXECUTE',
  ERROR: {
    UNSUPPORTED_ORIGIN: 'UNSUPPORTED_ORIGIN',
  },
};
