import { SERVICE_KEY } from '@/constants';
import { getBucket } from '@extend-chrome/storage';

export const ROOT_LEVEL_KEY = 'data';
export const PROCESSING_FLAG_KEY = 'processing';

export type TStorage = TData & TProgressing;
export type TData = {
  [ROOT_LEVEL_KEY]: {
    [key: number]: TItems;
  };
};
export type TProgressing = {
  [PROCESSING_FLAG_KEY]: boolean;
};
export type TItem = {
  id: string;
  title: string;
};
export type TItems = TItem[];

// e.g.
// [`extend-chrome/storage__${bucketName}_keys`]: {
//  data: { [timestamp]: items }
// }
// @see: https://github.com/extend-chrome/storage/blob/main/src/bucket/index.ts#L53-L54
export const bucket = getBucket<TStorage>(SERVICE_KEY, 'local');

export const getData = async (): Promise<TData[typeof ROOT_LEVEL_KEY]> => {
  const result = await bucket.get(ROOT_LEVEL_KEY);
  return result[ROOT_LEVEL_KEY];
};

export const getProgressing = async (): Promise<
  TProgressing[typeof PROCESSING_FLAG_KEY]
> => {
  const result = await bucket.get(PROCESSING_FLAG_KEY);
  return result[PROCESSING_FLAG_KEY];
};

export const resetStorage = (): void => {
  bucket.clear();
  bucket.set({ [PROCESSING_FLAG_KEY]: false });
};
