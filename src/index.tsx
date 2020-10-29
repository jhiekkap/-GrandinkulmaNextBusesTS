import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client'
import { client } from './graphQL'
import { reducer, StateProvider } from "./state";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StateProvider>,
  </React.StrictMode>,
  document.getElementById('root')
); 
 
