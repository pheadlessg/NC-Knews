const db = require('../db/connection');

module.exports = {
  fetchTopics(query) {
    const {
      limit = 10, sort_by = 'slug', orderDir = 'asc', p = 0,
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
      .select(
        'articles.article_id',
        'title',
        'articles.votes',
        'articles.topic',
        'articles.username as author',
        'articles.created_at',
      )
      .join('users', 'articles.username', '=', 'users.username')
      .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
      .limit(limit)
      .offset(p * limit)
      .orderBy(sort_by, orderDir)
      .count('comments.comment_id as comment_count')
      .groupBy('articles.article_id', 'users.username')
      .where({ topic: params.slug });
    return newQuery;
  },
  makeArticle(params, body) {
    return db('articles')
      .insert({
        topic: params.slug,
        title: body.title,
        body: body.body,
        username: body.username,
        created_at: 'NOW()',
      })
      .returning('*');
  },
};
