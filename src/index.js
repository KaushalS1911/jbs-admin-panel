import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';

// style + assets
import 'assets/scss/style.scss';
import config from './config';
import store from 'store/store/store';


// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
);

serviceWorker.unregister();
