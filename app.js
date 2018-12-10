const app = require('express')();
const cors = require('cors');
const bodyparser = require('body-parser');
const apiRouter = require('./routes/api');
const {
  handle404, handle400, handle422, handle500,
} = require('./errors');

app.use(cors());
app.use(bodyparser.json());

app.use('/api', apiRouter);
app.use('/*', (req, res, next) => {
  next({ status: 404, msg: 'Page not found!' });
});

app.use(handle404);
app.use(handle400);
app.use(handle422);
app.use(handle500);

module.exports = app;
