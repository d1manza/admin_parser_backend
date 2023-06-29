const config = require('../config/config');

class Shared {
    constructor() {
    }

    async logging(funcName, status, message) {
        const date = new Date();
        console.log(`[${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.toLocaleTimeString()}] - Function: ${funcName}. Status: ${status}. Message: ${message}`);
    }

}

module.exports = Shared;
