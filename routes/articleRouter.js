const articleRouter = require('express').Router();
const {
  getArticles,
  getSingleArticle,
  changeVotes,
  deleteArticle,
  getComments,
  postComment,
} = require('../controllers/articlesController');

articleRouter.get('/:article_id', getSingleArticle);
articleRouter.patch('/:article_id', changeVotes);
articleRouter.delete('/:article_id', deleteArticle);
articleRouter.get('/:article_id/comments', getComments);
articleRouter.post('/:article_id/comments', postComment);
articleRouter.get('/', getArticles);


module.exports = articleRouter;
