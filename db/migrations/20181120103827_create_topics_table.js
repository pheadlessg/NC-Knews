exports.up = function (knex, Promise) {
  return knex.schema.createTable('topics', (topics) => {
    topics
      .string('slug')
      .unique()
      .notNullable()
      .primary();
    topics.string('description').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('topics');
};
