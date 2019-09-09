import { MOVE_REQUEST, CONNECT_MQTT } from "./actionTypes";

const moveCandidates = () => ({
    type: MOVE_REQUEST,
});

const connectToMqtt = async (topic) => ({
    type: CONNECT_MQTT,
    topic,
});

export {
    moveCandidates,
    connectToMqtt,
}