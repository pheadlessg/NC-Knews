const apiRouter = require('express').Router();

const topicRouter = require('./topicRouter');
const articleRouter = require('./articleRouter');

apiRouter.get('/', (req, res) => {
  res.status(200).send({ msg: 'Hit the server' });
});
apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);

module.exports = apiRouter;
