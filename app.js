const config = require('./app/config/config');
const express = require('express');
const cors = require('cors');
const Auth = require('./app/services/auth');
const auth = new Auth();
const Categories = require('./app/services/categories');
const categories = new Categories();

const app = express();
app.use(cors());
const jsonParser = express.json();

app.post('/api/auth', jsonParser, function (req, res) {
    auth.login(req, res);
});

app.post('/api/categories', jsonParser, function (req, res) {
    categories.getCategories(req, res);
});

const server = app.listen(config.server.port, function () {
    console.log(`Server listened host: ${config.server.host}, port: ${config.server.port}`);
});


