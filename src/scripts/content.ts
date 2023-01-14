import { CHROME_MESSAGES, SUPPORTED_ORIGINS } from '@/constants';

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === CHROME_MESSAGES.EXECUTE) {
    const origin = location.origin;
    const supported = SUPPORTED_ORIGINS.includes(origin);

    if (!supported) {
      sendResponse({
        type: CHROME_MESSAGES.ERROR.UNSUPPORTED_ORIGIN,
        payload: origin,
      });
    }
  }
});
