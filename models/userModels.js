const db = require('../db/connection');

module.exports = {
  fetchUsers(query) {
    const {
      limit = 10, sort_by = 'username', orderDir = 'asc', p = 0,
    } = query;
    return db('users')
      .select()
      .limit(limit)
      .offset(p * limit)
      .orderBy(sort_by, orderDir)
      .returning('*');
  },
  fetchSingleUser(params) {
    return db('users')
      .select()
      .where({ 'users.username': params.username })
      .returning('*');
  },
};
