import { CHROME_MESSAGES, SUPPORTED_ORIGINS } from '@/constants';
import { execute } from '@/scripts/scraping';
import { getProgressing } from '@/utils/storage';

const isReady = (): boolean => {
  return document.readyState === 'complete';
};

const isSupported = (): boolean => {
  const origin = location.origin;
  return SUPPORTED_ORIGINS.includes(origin);
};

const initialize = async () => {
  const supported = isSupported();

  chrome.runtime.onMessage.addListener(
    async (request, _sender, sendResponse) => {
      if (request.type === CHROME_MESSAGES.EXECUTE) {
        if (!supported) {
          sendResponse({
            type: CHROME_MESSAGES.ERROR.UNSUPPORTED_ORIGIN,
            payload: origin,
          });
          return;
        }

        execute();
      }
    }
  );

  const processing = await getProgressing();
  if (supported && processing) {
    if (isReady()) {
      execute();
    } else {
      document.addEventListener('DOMContentLoaded', execute);
    }
  }
};
initialize();
