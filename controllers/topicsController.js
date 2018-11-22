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
      const fixedArticlesArr = articles.reduce((artArr, article) => {
        const newObj = {
          author: article.username,
          title: article.title,
          article_id: article.article_id,
          votes: article.votes,
          comment_count: article.count,
          created_at: article.created_at,
          topic: article.topic,
        };
        artArr.push(newObj);
        return artArr;
      }, []);
      res.status(200).send(fixedArticlesArr);
    }).catch(next);
  },
  addNewArticle(req, res, next) {
    makeArticle(req.params, req.body).then((article) => {
      const finalArticle = {
        article: article[0],
      };
      res.status(201).send(finalArticle);
    });
  },
};
