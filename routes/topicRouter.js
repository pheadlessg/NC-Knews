const topicRouter = require('express').Router();
const {
  getTopics, addTopic, getTopicArticles, addNewArticle,
} = require('../controllers/topicsController');
const { handle405 } = require('../errors/405error');

topicRouter.route('/').get(getTopics).post(addTopic).all(handle405);
// topicRouter.post('/', addTopic).all(handle405);
topicRouter.route('/:slug/articles').get(getTopicArticles).post(addNewArticle).all(handle405);
// topicRouter.post('', addNewArticle).all(handle405);

module.exports = topicRouter;
