const topicRouter = require('express').Router();
const { getTopics } = require('../controllers/topicsController');

topicRouter.get('/', getTopics);

module.exports = topicRouter;
