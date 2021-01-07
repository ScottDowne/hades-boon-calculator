import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers.js';
import initialState from './initialState.js';
import middleware from './middleware.js';
import App from './components/App.jsx';

const store = createStore(combineReducers(reducers), initialState, applyMiddleware(middleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
