const apiRouter = require('express').Router();

const topicRouter = require('./topicRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const userRouter = require('./userRouter');
const endpointJSON = require('../endpoints.json');
const handle405 = require('../errors/405error');

apiRouter
  .get('/', (req, res) => {
    res.status(200).send(endpointJSON);
  })
  .all(handle405);
apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
