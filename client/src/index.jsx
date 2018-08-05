import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import App from './views/App';
import reducers from './store/reducers';

import './styles/main.scss';

const config = {
  google: {
    families: ['Montserrat:400,500,700:latin,latin-ext', 'Raleway:400,500,700:latin,latin-ext'],
  },
};

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <WebfontLoader config={config}>
    <Provider store={store}>
      <App />
    </Provider>
  </WebfontLoader>,
  document.getElementById('root'),
);
