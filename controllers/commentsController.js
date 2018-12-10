const {
  updateVotes,
  removeComment,
} = require('../models/commentModels');

module.exports = {
  changeVotes(req, res, next) {
    updateVotes(req.params, req.body).then((comment) => {
      const newObj = {
        comment: comment[0],
      };
      res.status(200).send(newObj);
    }).catch(next);
  },
  deleteComment(req, res, next) {
    // problem here - what should it return?
    removeComment(req.params).then((comment) => {
      const newObj = {
        rows_affected: comment,
      };
      res.status(204).send(newObj);
    }).catch(next);
  },
};
