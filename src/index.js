import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider, injectGlobal } from 'styled-components';
import styleConfig from './config/styleConfig';
import App from './App';
import appState from './reducers/appState';
import authState from './reducers/authState';

const fontImports = styleConfig.fontImports.map(url => (
  `@import url('${url}');`
)).join('\r\n');

injectGlobal([`

${ fontImports }

* {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  font-family: sans-serif;
  border: 0;
  padding: 0;
  margin: 0;
  font-size: 16px;
  background: linear-gradient(to bottom, ${styleConfig.colors.pink} 0%, ${styleConfig.colors.yellow} 100vh);
  background-repeat: no-repeat;
  background-attachment: fixed;
}

`]);

const theme = {};

const SpotifySetlistStore = createStore(
  combineReducers({
    appState,
    authState,
  }),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={SpotifySetlistStore}>
      <App />
    </Provider>
  </ThemeProvider>
  , document.getElementById('root')
);
