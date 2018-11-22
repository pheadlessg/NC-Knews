const db = require('../db/connection');

module.exports = {
  fetchArticles(query) {
    const {
      limit = 10,
      sort_by = 'created_at',
      p = 0,
      sort_ascending = false,
      orderDir = sort_ascending ? 'asc' : 'desc',
    } = query;
    const newQuery = db('articles')
      .select('articles.article_id', 'title', 'articles.votes', 'articles.topic', 'username', 'articles.created_at')
      .join('users', 'articles.user_id', '=', 'users.user_id')
      .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
      .limit(limit)
      .offset(p * limit)
      .orderBy(sort_by, orderDir)
      .count('comments.comment_id')
      .groupBy('articles.article_id', 'users.user_id');
    return newQuery;
  },
  fetchSingleArticle(params) {
    return db('articles')
      .select('articles.article_id', 'title', 'articles.votes', 'articles.topic', 'username', 'articles.created_at')
      .join('users', 'articles.user_id', '=', 'users.user_id')
      .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
      .count('comments.comment_id')
      .groupBy('articles.article_id', 'users.user_id')
      .where({ 'articles.article_id': params.article_id });
  },
  updateVotes(params, body) {
    return db('articles')
      .where({ 'articles.article_id': params.article_id })
      .increment('votes', body.inc_votes)
      .returning('*');
  },
};
