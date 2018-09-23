import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import Raven from 'raven-js';
import App from './views/App';
import reducers from './store/reducers';

import 'react-tippy/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import './styles/main.less';
import './styles/main.scss';

const config = {
  google: {
    families: ['Roboto:300,400,500,700:latin,latin-ext'],
  },
};

Raven.config('https://f8a65787b57542d5b3f1491053941fc1@sentry.io/1279118', {
  whitelistUrls: [/instudy-prod.herokuapp\.com/],
});

const history = createBrowserHistory();

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk,
  routerMiddleware(history),
)(createStore);
const store = createStoreWithMiddleware(
  connectRouter(history)(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <WebfontLoader config={config}>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </WebfontLoader>,
  document.getElementById('root'),
);
