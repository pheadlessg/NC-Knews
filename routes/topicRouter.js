const topicRouter = require('express').Router();
const {
  getTopics, addTopic, getTopicArticles, addNewArticle,
} = require('../controllers/topicsController');

topicRouter.get('/', getTopics);
topicRouter.post('/', addTopic);
topicRouter.get('/:slug/articles', getTopicArticles);
topicRouter.post('/:slug/articles', addNewArticle);

module.exports = topicRouter;
