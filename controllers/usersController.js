const { fetchUsers, fetchSingleUser } = require('../models/userModels');

module.exports = {
  getUsers(req, res, next) {
    fetchUsers(req.query)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch(next);
  },
  getSingleUser(req, res, next) {
    fetchSingleUser(req.params)
      .then((user) => {
        if (!user.length) return Promise.reject({ status: 404, msg: 'User does not exist' });
        const newObj = {
          user: user[0],
        };
        return res.status(200).send(newObj);
      })
      .catch(next);
  },
};
