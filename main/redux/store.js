import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/reducers';

// funcion que permite vincular el middleware con la extension del navegador
const bindMiddlware = (middlware) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middlware));
  }
  // si esta en produccion no se vincula con la extension
  return applyMiddleware(...middlware);
};

// reducer principal de la aplicacion, si es hidratada por next devolvera el estado actual, y el payload del action
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  // sino el estado se inyectara desde los reducers
  return reducers(state, action);
};

const initStore = () => createStore(reducer, bindMiddlware([thunkMiddleware]));

export const wrapper = createWrapper(initStore);
