const {
  fetchArticles,
  fetchSingleArticle,
  updateVotes,
  removeArticle,
  fetchComments,
  addComment,
} = require('../models/articleModels');

module.exports = {
  getArticles(req, res, next) {
    fetchArticles(req.query)
      .then((articles) => {
        res.status(200).send(articles);
      })
      .catch(next);
  },
  getSingleArticle(req, res, next) {
    fetchSingleArticle(req.params)
      .then(([article]) => {
        if (!article) return Promise.reject({ status: 404, msg: 'Article does not exist' });
        const newObj = {
          articles: article,
        };
        return res.status(200).send(newObj);
      })
      .catch(next);
  },
  changeVotes(req, res, next) {
    updateVotes(req.params, req.body)
      .then((article) => {
        const newObj = {
          article: article[0],
        };
        res.status(200).send(newObj);
      })
      .catch(next);
  },
  deleteArticle(req, res, next) {
    // problem here - what should it return?
    removeArticle(req.params)
      .then((article) => {
        const newObj = {
          rows_affected: article,
        };
        res.status(204).send(newObj);
      })
      .catch(next);
  },

  getComments(req, res, next) {
    fetchComments(req.params, req.query)
      .then((comments) => {
        const fixedCommentArr = comments.reduce((comArr, comment) => {
          const newObj = {
            comment_id: comment.comment_id,
            username: comment.username,
            article_id: comment.article_id,
            votes: comment.votes,
            created_at: comment.created_at,
            body: comment.body,
          };
          comArr.push(newObj);
          return comArr;
        }, []);
        res.status(200).send(fixedCommentArr);
      })
      .catch(next);
  },
  postComment(req, res, next) {
    addComment(req.params, req.body)
      .then((comment) => {
        const comObj = {
          comment: comment[0],
        };
        res.status(201).send(comObj);
      })
      .catch(next);
  },
};
