import { SERVICE_KEY } from '@/constants';
import { ROOT_LEVEL_KEY, TData, TItems } from '@/utils/storage';

// 引数から冪等的な文字列を作る
export const createUid = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)));
};

export const getItems = (data: TData[typeof ROOT_LEVEL_KEY]): TItems => {
  return Object.values(data).flat();
};

const CSV_HEADERS = ['id', 'title'];
const CSV_SEPARATOR = '\r\n';

export const createCsv = (items: TItems): string => {
  let result = createLine(CSV_HEADERS);
  return items.reduce(
    (sum, item) => sum + createLine([item['id'], item['title']]),
    result
  );
};

const createLine = (values: string[]): string => {
  return `${values.join(',')}${CSV_SEPARATOR}`;
};

export const downloadCsv = (csv: string) => {
  const fileName = getFileName();
  const blob = new Blob([csv], { type: 'text/csv' });
  const uri = URL.createObjectURL(blob);

  let link = document.createElement('a');
  link.download = fileName;
  link.href = uri;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};

export const isDev = () => import.meta.env.DEV;

export const getFileName = () => {
  const date = new Date();
  const formatted = [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
    date.getHours().toString().padStart(2, '0'),
    date.getMinutes().toString().padStart(2, '0'),
    date.getSeconds().toString().padStart(2, '0'),
  ].join('');

  return `${SERVICE_KEY}_${formatted}`;
};
