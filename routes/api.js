const apiRouter = require('express').Router();

const topicRouter = require('./topicRouter');

apiRouter.get('/', (req, res) => {
  res.status(200).send({ msg: 'Hit the server' });
});
apiRouter.use('/topics', topicRouter);

module.exports = apiRouter;
