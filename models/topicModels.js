const db = require('../db/connection');

module.exports = {
  fetchTopics(query) {
    const {
      results = 10,
      sortOrder = 'slug',
      orderBy = 'asc',
      offset = 0,
    } = query;
    return db('topics')
      .select()
      .limit(results)
      .offset(offset)
      .orderBy(sortOrder, orderBy)
      .returning('*');
  },
};
