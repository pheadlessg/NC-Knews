const db = require('../db/connection');

module.exports = {
  updateVotes(params, body) {
    return db('comments')
      .where({ 'comments.comment_id': params.comment_id })
      .increment('votes', body.inc_votes)
      .returning('*');
  },
  removeComment(params) {
    return db('comments')
      .where('comments.comment_id', params.comment_id)
      .del();
  },
};
