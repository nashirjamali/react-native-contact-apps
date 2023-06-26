import {createStore, combineReducers, applyMiddleware} from 'redux';
import {formReducer} from './reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({formReducer});

export default createStore(rootReducer, applyMiddleware(thunk));

export type State = ReturnType<typeof rootReducer>;
