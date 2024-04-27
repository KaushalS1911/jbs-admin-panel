import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import 'assets/scss/style.scss';
import config from './config';
import store from 'store/store/store';



const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
);

serviceWorker.unregister();
