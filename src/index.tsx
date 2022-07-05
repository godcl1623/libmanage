import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import * as initSW from './serviceWorkerRegistration';
import store from './slices';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

// initSW.unregister();
initSW.register('');