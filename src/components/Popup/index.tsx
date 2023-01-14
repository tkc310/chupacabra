import '@/index.css';
import styles from './index.module.scss';

const Popup = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p class='font-bold'>
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href='https://github.com/solidjs/solid'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default Popup;
