import { CHROME_MESSAGES, SUPPORTED_ORIGINS } from '@/constants';

const initialize = () => {
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === CHROME_MESSAGES.EXECUTE) {
      const origin = location.origin;
      const supported = SUPPORTED_ORIGINS.includes(origin);

      if (!supported) {
        sendResponse({
          type: CHROME_MESSAGES.ERROR.UNSUPPORTED_ORIGIN,
          payload: origin,
        });
        return;
      }

      scrape();
    }
  });
};
initialize();

const scrape = () => {
  // 最下部までスクロールして遅延コンテンツを読み込む
  const PAGE_Y_TMP = 10000;
  scrollTo(0, PAGE_Y_TMP);

  setTimeout(() => {
    const nodes = document.querySelectorAll('h2');
    if (nodes.length) {
      const titles = Array.prototype.map
        .call(nodes, (item) => String(item.innerText))
        .filter(Boolean) as string[];
      const items = titles.map((title) => {
        const id = encode(title);
        return { id, title };
      });
      const data = {
        items,
      };

      chrome.storage.local.set(data, () => {
        console.log(data);
      });
    }
  }, 300);
};

const encode = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)));
};
