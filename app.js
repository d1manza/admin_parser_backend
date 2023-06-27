const config = require('./app/config/config');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
var jsonParser = express.json();

const server = app.listen(config.server.port, function () {
    console.log(`Server listened host: ${config.server.host}, port: ${config.server.port}`);
});

