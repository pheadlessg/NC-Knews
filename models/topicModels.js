const db = require('../db/connection');

module.exports = {
  fetchTopics(query) {
    const {
      limit = 10,
      sort_by = 'slug',
      orderDir = 'asc',
      p = 0,
    } = query;
    return db('topics')
      .select()
      .limit(limit)
      .offset(p * limit)
      .orderBy(sort_by, orderDir)
      .returning('*');
  },
  makeTopic(body) {
    return db('topics')
      .insert(body)
      .returning('*');
  },
  fetchTopicArticles(params, query) {
    const {
      limit = 10,
      sort_by = 'articles.created_at',
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
      .groupBy('articles.article_id', 'users.user_id')
      .where({ topic: params.slug });
    return newQuery;
  },
  makeArticle(params, body) {
    return db('articles').insert({
      topic: params.slug, title: body.title, body: body.body, user_id: body.user_id, created_at: 'NOW()',
    }).returning('*');
  },
};
