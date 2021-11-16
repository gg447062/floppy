import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from 'react-moralis';

const appId = process.env.MORALIS_APP_ID;
const serverURL = process.env.MORALIS_SERVER_URL;

ReactDOM.render(
  <MoralisProvider appId={appId} serverUrl={serverURL}>
    <App />
  </MoralisProvider>,
  document.getElementById('app')
);
