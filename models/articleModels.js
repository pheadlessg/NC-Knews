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
      .select(
        'articles.article_id',
        'title',
        'articles.votes',
        'articles.topic',
        'articles.username as author',
        'articles.created_at',
        'articles.body',
      )
      .join('users', 'articles.username', '=', 'users.username')
      .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
      .limit(limit)
      .offset(p * limit)
      .orderBy(sort_by, orderDir)
      .count('comments.comment_id as comment_count')
      .groupBy('articles.article_id', 'users.username');
    return newQuery;
  },
  fetchSingleArticle(params) {
    return db('articles')
      .select(
        'articles.article_id',
        'title',
        'articles.votes',
        'articles.topic',
        'articles.username as author',
        'articles.created_at',
        'articles.body',
      )
      .join('users', 'articles.username', '=', 'users.username')
      .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
      .count('comments.comment_id as comment_count')
      .groupBy('articles.article_id', 'users.username')
      .where({ 'articles.article_id': params.article_id });
  },
  updateVotes(params, body) {
    return db('articles')
      .where({ 'articles.article_id': params.article_id })
      .increment('votes', body.inc_votes)
      .returning('*');
  },
  removeArticle(params) {
    return db('articles')
      .where('articles.article_id', params.article_id)
      .del();
  },
  fetchComments(params, query) {
    const {
      limit = 10,
      sort_by = 'created_at',
      p = 0,
      sort_ascending = false,
      orderDir = sort_ascending ? 'asc' : 'desc',
    } = query;
    return db('comments')
      .select()
      .join('users', 'comments.username', '=', 'users.username')
      .limit(limit)
      .offset(p * limit)
      .orderBy(sort_by, orderDir)
      .where({ 'comments.article_id': params.article_id });
  },
  addComment(params, body) {
    return db('comments')
      .insert({
        article_id: params.article_id,
        username: body.username,
        body: body.body,
        created_at: 'NOW()',
      })
      .returning('*');
  },
};
