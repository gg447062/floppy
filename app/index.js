import App from './Components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from 'react-moralis';
import store from './store';
import { Provider } from 'react-redux';

const appId = process.env.TEST_APP_ID;
const serverURL = process.env.TEST_SERVER_URL;

ReactDOM.render(
  <MoralisProvider appId={appId} serverUrl={serverURL}>
    <Provider store={store}>
      <App />
    </Provider>
  </MoralisProvider>,
  document.getElementById('app')
);
