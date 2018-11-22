const app = require('express')();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/api');

app.use(bodyparser.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else if (err.code === '23502') {
    next({ status: 400, msg: 'Bad Post Request' });
  } else if (err.code === '22P02') {
    next({ status: 400, msg: 'Invalid Data Type' });
  } else if (err.message === 'No data returned from the query.') {
    next({ status: 404, msg: 'No Data Found' });
  } else res.status(500).send({ msg: 'Internal Server Error' });
});

module.exports = app;
