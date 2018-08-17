import React from 'react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import ReactDOM from 'react-dom';
import store, { history } from './store';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, 
document.getElementById('root'));