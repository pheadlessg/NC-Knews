const apiRouter = require('express').Router();

const topicRouter = require('./topicRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const userRouter = require('./userRouter');

apiRouter.get('/', (req, res) => {
  res.status(200).send({ msg: 'Hit the server' });
});
apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
