import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { MOVE_REQUEST, MOVE_REQUEST_SUCCESS, CONNECT_MQTT } from "../actions/actionTypes";

function fetchMoveCandidates() {
    return axios.post('http://localhost:4000/move-candidates');
}

function* moveCandidates() {
    try {
        let resp = yield call(fetchMoveCandidates);
        const queueId = resp.data.queueId;

        yield put({
            type: MOVE_REQUEST_SUCCESS,
            queueId
        });

        yield put({
            type: CONNECT_MQTT,
            topic: queueId,
        });
    } catch (e) {
        console.error(e);
    }
}

function* moveSaga() {
    yield takeLatest(MOVE_REQUEST, moveCandidates);
}

export default moveSaga;

