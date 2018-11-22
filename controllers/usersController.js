const {
  fetchUsers, fetchSingleUser,
} = require('../models/userModels');

module.exports = {
  getUsers(req, res, next) {
    fetchUsers(req.query).then((users) => {
      res.status(200).send(users);
    });
  },
  getSingleUser(req, res, next) {
    fetchSingleUser(req.params).then((user) => {
      const newObj = {
        user: user[0],
      };
      res.status(200).send(newObj);
    });
  },
};
