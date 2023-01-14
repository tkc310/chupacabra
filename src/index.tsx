import Popup from '@/components/Popup';
import { render } from 'solid-js/web';
import './index.css';

const app = document.querySelector('#app');
if (!app) {
  throw new Error('Can not find App');
}

render(Popup, app);
