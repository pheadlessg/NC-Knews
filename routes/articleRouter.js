const articleRouter = require('express').Router();
const {
  getArticles,
  getSingleArticle,
  changeVotes,
} = require('../controllers/articlesController');

articleRouter.get('/:article_id', getSingleArticle);
articleRouter.patch('/:article_id', changeVotes);
articleRouter.get('/', getArticles);


module.exports = articleRouter;
