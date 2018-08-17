import { createStore,  applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
export const history = createHistory();


const initialState = {}
const enhancers = []
const middleware = [
    routerMiddleware(history),
    thunk,
  ]

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )

const store = createStore(
  rootReducer, 
  initialState, 
  composedEnhancers
);

export default store