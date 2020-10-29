import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client'
import { client } from './graphQL'
import { reducer, StateProvider } from "./state";
import { CssBaseline } from '@material-ui/core';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <App />
      </ApolloProvider>
    </StateProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

