import * as mqtt from 'mqtt';

const getClient = () => {
    return mqtt.connect('ws://localhost:9001');
};

class WebsocketClient {
    client;
    onMessageFn;

    connect = ({ topic, onMessageFn }) => {
        this.onMessageFn = onMessageFn;

        this.client = getClient();

        this.client.on('connect', () => {
            this.client.subscribe(topic);
        });
        this.client.on('error', err => this.handleError(err));
        this.client.on('message', (topic, message) => {
            this.onMessageFn(new TextDecoder("utf-8").decode(message));
        });
    };

    handleError = async () => {
        await this.client.end(true);
    };
}

let websocketClientInstance;

const getWebsocketClient = ({ topic, onMessageFn }) => {
    if (!websocketClientInstance) {
        websocketClientInstance = new WebsocketClient();
        websocketClientInstance.connect({ topic, onMessageFn });
    }
    return websocketClientInstance;
};

export {
    getWebsocketClient
};
