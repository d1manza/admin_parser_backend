const config = require('./app/config/config');
const express = require('express');
const cors = require('cors');
const Auth = require('./app/services/auth');
const auth = new Auth();

const app = express();
app.use(cors());
var jsonParser = express.json();

app.post('/api/auth', jsonParser, function (req, res) {
    auth.login(req, res);
});

const server = app.listen(config.server.port, function () {
    console.log(`Server listened host: ${config.server.host}, port: ${config.server.port}`);
});


