import queueReducer from './queueReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
    queue: queueReducer,
});