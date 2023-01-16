import { createCsv, createUid, downloadCsv, getItems, isDev } from '@/utils';
import {
  bucket,
  getData,
  PROCESSING_FLAG_KEY,
  resetStorage,
  ROOT_LEVEL_KEY,
} from '@/utils/storage';

const scrape = () => {
  return new Promise((resolve, reject) => {
    try {
      console.log('scrape');

      bucket.set({ [PROCESSING_FLAG_KEY]: true });

      // 最下部までスクロールして遅延コンテンツを読み込む
      const PAGE_Y_TMP = 10000;
      scrollTo(0, PAGE_Y_TMP);

      setTimeout(async () => {
        const nodes = document.querySelectorAll('h2');
        if (nodes.length) {
          const titles = Array.prototype.map
            .call(nodes, (item) => String(item.innerText))
            .filter((item): item is string => Boolean(item));
          const values = titles.map((title) => {
            const id = createUid(title);
            return { id, title };
          });

          const key = Date.now();
          const data = {
            [key]: values,
          };
          const base = await getData();
          const override = { ...base, ...data };

          const result = await bucket.set({ [ROOT_LEVEL_KEY]: override });

          const log: unknown[] = ['saved'];
          if (isDev()) log.push(result);
          console.log(log);

          resolve(undefined);
        }
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
};

const output = async () => {
  console.log('output');
  const data = await getData();
  const items = getItems(data);
  const csv = createCsv(items);
  downloadCsv(csv);

  if (isDev()) {
    console.log({
      data,
      items,
      csv,
    });
  }
};

export const execute = async () => {
  console.log('start');

  try {
    await scrape();
    const nodeNext = document.querySelector("a[data-testid='pagerNext']");
    if (nodeNext) {
      console.log('navigate next');
      (nodeNext as HTMLElement).click();
    }
    // 最初のページに次へボタンが存在しない
    else {
      output();
      resetStorage();

      console.log('progressed');
    }
  } catch (error) {
    resetStorage();

    alert(`処理に失敗しました。${error}`);
    console.log('error', error);
  }
};
