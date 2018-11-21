exports.up = function (knex, Promise) {
  console.log('Creating articles table...');
  return knex.schema.createTable('articles', (articles) => {
    articles
      .increments('article_id')
      .primary()
      .unsigned();
    // .onDelete('CASCADE')
    articles.string('title').notNullable();
    articles.string('body', [10000]).notNullable();
    articles.integer('votes');
    articles.string('topic').references('topics.slug');
    articles.integer('user_id').references('users.user_id');
    articles
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
  });
};

exports.down = function (knex, Promise) {
  console.log('Dropping articles table...');
  return knex.schema.dropTable('articles');
};
