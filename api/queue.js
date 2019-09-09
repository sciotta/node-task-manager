const Queue = require('bull');
const Mqtt = require('mqtt')
const uuidv1 = require('uuid/v1');
const utils = require('./utils');

const mqttClient  = Mqtt.connect('ws://localhost:9001');


module.exports = class QueueHelper {

    constructor() {
        this.queueId = uuidv1();
        this.queue = null;
        this.totalTasks = 0;
        this.totalProcessed = 0;
    }

    createQueue() {
        this.queue = new Queue(this.queueId, 'redis://127.0.0.1:6379');
        this.registerCompleteEvent();
        return this.queueId;
    }

    createTasks(total) {
        this.totalTasks = total;
        for (let i = 0; i < total; i++) {
            this.queue.add('task', {
                duration: utils.randomBetween(1, 3) * 1000,
                index: i,
            });
        }
    }

    startProcess() {
        this.queue.process('task', 30,`${__dirname}/processor.js`);
    }

    cleanQueue() {
        this.queue.clean(0);
    }

    registerCompleteEvent() {
        this.queue.on('global:completed', () => {
            this.totalProcessed = this.totalProcessed + 1;
            const percentage = (100 * this.totalProcessed)/this.totalTasks;
            mqttClient.publish(this.queueId, percentage.toString());
            if(percentage === 100) {
                this.cleanQueue();
                this.queue.close().then(function() {
                    console.log('Process completed!');
                });
            }
        });
    }
};
