const commentRouter = require('express').Router();
const {
  changeVotes,
  deleteComment,
} = require('../controllers/commentsController');

commentRouter.patch('/:comment_id', changeVotes);
commentRouter.delete('/:comment_id', deleteComment);

module.exports = commentRouter;
