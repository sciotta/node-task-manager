import { all } from 'redux-saga/effects';
import MoveSaga from './moveSaga';
import MqttSaga from './mqttSaga';

export default function* rootSaga() {
    yield all([
        MoveSaga(),
        MqttSaga(),
    ]);
}
