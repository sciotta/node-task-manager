const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const QueueHelper = require('./queue');

app.post('/move-candidates', function (req, res) {
    const queueHelper = new QueueHelper();
    const queueId = queueHelper.createQueue();
    queueHelper.createTasks(500);
    queueHelper.startProcess();
    res.json({queueId: queueId});
});

app.listen(4000, function () {
    console.log('Listening on port 4000!');
});
