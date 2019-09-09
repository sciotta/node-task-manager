import { put, takeLatest, take, call } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {UPDATE_PROGRESS, CONNECT_MQTT, UPDATE_PROGRESS_COMPLETED} from '../actions/actionTypes';
import { getWebsocketClient } from '../services/websocket';


function mqttEventChannel(topic) {
    return eventChannel(emitter => {
        try {
            getWebsocketClient({
                topic,
                onMessageFn: (message) => { emitter(parseInt(message)); }
            });
        } catch (e) {
            console.error(e);
            emitter(END);
        }

        return () => { console.log('CLOSED!'); };
    });
}

function* connectMqtt(action) {
    const { topic } = action;
    const chan = yield call(mqttEventChannel, topic)
    try {
        while (true) {
            let progress = yield take(chan);
            yield put({
                type: progress === 100 ? UPDATE_PROGRESS_COMPLETED : UPDATE_PROGRESS,
                progress,
            });
        }
    } finally {
        console.log('terminated')
    }
}

function* mqttSaga() {
    yield takeLatest(CONNECT_MQTT, connectMqtt);
}

export default mqttSaga;

