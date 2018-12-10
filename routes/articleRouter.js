const articleRouter = require('express').Router();
const {
  getArticles,
  getSingleArticle,
  changeVotes,
  deleteArticle,
  getComments,
  postComment,
} = require('../controllers/articlesController');
const { handle405 } = require('../errors/405error');

articleRouter.route('/:article_id').get(getSingleArticle).patch(changeVotes).delete(deleteArticle)
  .all(handle405);
articleRouter.route('/:article_id/comments').get(getComments).post(postComment).all(handle405);
articleRouter.route('/').get(getArticles).all(handle405);

module.exports = articleRouter;
