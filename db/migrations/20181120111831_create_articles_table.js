exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articles) => {
    articles
      .increments('article_id')
      .primary()
      .unsigned();
    articles.string('title').notNullable();
    articles.string('body', [10000]).notNullable();
    articles.integer('votes').defaultTo(0);
    articles.string('topic').references('topics.slug');
    articles.string('username').references('users.username');
    articles.timestamp('created_at').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
