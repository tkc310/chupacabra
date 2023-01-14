import { CHROME_MESSAGES, SERVICE_NAME } from '@/constants';
import styles from './index.module.scss';

const Popup = () => {
  return (
    <div class={styles.container}>
      <header class={styles.header}>
        <h1>{SERVICE_NAME}</h1>
      </header>

      <section>
        <div class={styles.actions}>
          <button onClick={handleExecute} class={styles.btn}>
            実行する
          </button>
          <button onClick={handleClose} class={styles.btn}>
            閉じる
          </button>
        </div>
      </section>
    </div>
  );
};

const handleExecute = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTabId = tabs?.[0]?.id;

    if (currentTabId) {
      chrome.tabs.sendMessage(
        currentTabId,
        { type: CHROME_MESSAGES.EXECUTE },
        (response) => {
          if (response.type === CHROME_MESSAGES.ERROR.UNSUPPORTED_ORIGIN) {
            alert(`「${response.payload}」はサポート対象外のURLです`);
          }
        }
      );
    }
  });
};

const handleClose = () => {
  window.close();
};

export default Popup;
