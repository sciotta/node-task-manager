const utils = require('./utils');

module.exports = async function(job){
    await utils.sleep(job.data.duration);
    return `Index: ${job.data.index} Duration: ${job.data.duration}`;
};