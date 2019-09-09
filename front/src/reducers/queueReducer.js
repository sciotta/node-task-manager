import { combineReducers } from 'redux';
import * as types from '../actions/actionTypes';

export const queueId = (state = null, action) => {
    switch (action.type) {
        case types.MOVE_REQUEST_SUCCESS:
            return action.queueId;
        default:
            return state;
    }
};

export const progress = (state = 0, action) => {
    switch (action.type) {
        case types.UPDATE_PROGRESS:
            return action.progress;
        default:
            return state;
    }
};

export const completed = (state = false, action) => {
    return action.type === types.UPDATE_PROGRESS_COMPLETED
};

export default combineReducers({
    queueId,
    progress,
    completed,
});
