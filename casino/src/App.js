import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './state/reducer';

import Baccarat from './components/Baccarat';
import Blackjack from './components/Blackjack';
import Message from './components/Message';

let store
export const resetStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
}
resetStore()

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Message />
        <h1>My Casino</h1>
        <nav>
          <NavLink id="blackjackLink" to="/blackjack">Blackjack</NavLink>
          <NavLink id="baccaratLink" to="/baccarat">Baccarat</NavLink>
        </nav>
        <Routes>
          <Route path="/blackjack" element={<Blackjack />} />
          <Route path="/baccarat" element={<Baccarat />} />   
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
