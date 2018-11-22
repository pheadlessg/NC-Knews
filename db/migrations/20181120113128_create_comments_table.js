exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (comments) => {
    comments.increments('comment_id').primary();
    comments
      .integer('user_id')
      .references('users.user_id')
      .unsigned();
    comments
      .integer('article_id')
      .references('articles.article_id')
      .unsigned();
    comments.integer('votes').defaultTo(0);
    comments.timestamp('created_at').notNullable();
    comments.string('body', [10000]).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
