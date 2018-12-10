const {
  fetchTopics, makeTopic, fetchTopicArticles, makeArticle,
} = require('../models/topicModels');

module.exports = {
  getTopics(req, res, next) {
    fetchTopics(req.query)
      .then((topics) => {
        res.status(200).send(topics);
      })
      .catch(next);
  },
  addTopic(req, res, next) {
    makeTopic(req.body)
      .then((topic) => {
        const finalTopic = {
          topic: topic[0],
        };
        res.status(201).send(finalTopic);
      })
      .catch(next);
  },
  getTopicArticles(req, res, next) {
    fetchTopicArticles(req.params, req.query).then((articles) => {
      res.status(200).send(articles);
    }).catch(next);
  },
  addNewArticle(req, res, next) {
    makeArticle(req.params, req.body).then((article) => {
      const finalArticle = {
        article: article[0],
      };
      res.status(201).send(finalArticle);
    }).catch(next);
  },
};
