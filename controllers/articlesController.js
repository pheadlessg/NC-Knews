const {
  fetchArticles,
  fetchSingleArticle,
  updateVotes,
} = require('../models/articleModels');

module.exports = {
  getArticles(req, res, next) {
    fetchArticles(req.query)
      .then((articles) => {
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
  getSingleArticle(req, res, next) {
    fetchSingleArticle(req.params).then((article) => {
      const newObj = {
        article: {
          article_id: article[0].article_id,
          author: article[0].username,
          title: article[0].title,
          votes: article[0].votes,
          comment_count: article[0].count,
          created_at: article[0].created_at,
          topic: article[0].topic,
        },
      };
      res.status(200).send(newObj);
    }).catch(next);
  },
  changeVotes(req, res, next) {
    updateVotes(req.params, req.body).then((article) => {
      const newObj = {
        article: article[0],
      };
      res.status(202).send(newObj);
    }).catch(next);
  },
};
