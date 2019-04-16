// Description: Redux Store Configuration

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers'; //Import the root reducer

// use redux thunk
const enhancer = compose(applyMiddleware(thunk));

export default createStore(reducers, enhancer);
