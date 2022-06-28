import App from './Components/App';
import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { MoralisProvider } from 'react-moralis';
import store from './store';
import { Provider } from 'react-redux';

const appId = process.env.TEST_APP_ID;
const serverURL = process.env.TEST_SERVER_URL;

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <MoralisProvider appId={appId} serverUrl={serverURL}>
    <Provider store={store}>
      <App />
    </Provider>
  </MoralisProvider>
);
