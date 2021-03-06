const ENV = process.env.NODE_ENV;
const {
  articleData, userData, commentData, topicData,
} = ENV === 'test' ? require('../db/data/test-data/') : require('../db/data/development-data/');
const { makeRefObj, formatArticles, formatComments } = require('../utils/utils');

exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('topics').del(),
    knex('users').del(),
    knex('articles').del(),
    knex('comments').del(),
  ]).then(() => knex('topics')
    .insert(topicData)
    .then(() => knex('users')
      .insert(userData)
      .returning('*'))
    .then((userdocs) => {
      const formattedArticles = formatArticles(articleData, userdocs);
      return knex('articles')
        .insert(formattedArticles)
        .returning('*')
        .then((articledocs) => {
          const articleRefObj = makeRefObj(articledocs, 'title', 'article_id');
          const formattedComments = formatComments(commentData, articleRefObj);
          return knex('comments').insert(formattedComments);
        });
    }));
};
