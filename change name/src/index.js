import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './Reducers/productsReducer';
import userReducer from './Reducers/userReducer';


const allReducers = combineReducers({
    products: productsReducer,
    user: userReducer
})

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
);
const store = createStore(
    allReducers, 
    {
        products: [{name: 'iPhone'}],
        user: 'Powell'
    },
    allStoreEnhancers
);

ReactDOM.render(<Provider store={store}><App random='whatever'/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
