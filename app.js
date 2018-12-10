const app = require('express')();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/api');
const {
  handle404, handle400, handle422, handle500,
} = require('./errors');
// const handle405 = require('./errors/405error');

app.use(bodyparser.json());

app.use('/api', apiRouter);
app.use('/*', (req, res, next) => {
  next({ status: 404, msg: 'Page not found!' });
});

// app.use(handle405);
app.use(handle404);
app.use(handle400);
app.use(handle422);
app.use(handle500);

module.exports = app;
