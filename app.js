const app = require('express')();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/api');

app.use(bodyparser.json());

app.use('/api', apiRouter);

module.exports = app;
