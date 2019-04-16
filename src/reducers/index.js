// Root reducer

import { combineReducers } from 'redux';
import todoReducer from './todos';
import visibilityFilter from './visibilityFilter';

import authReducer from "./auth"
// import { reducer as homeReducer } from "../home"

// Combine all the reducers
// const rootReducer = combineReducers({ authReducer, homeReducer });
const rootReducer = combineReducers({auth:authReducer, todo:todoReducer, });

export default rootReducer;

