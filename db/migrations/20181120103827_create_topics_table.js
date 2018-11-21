exports.up = function (knex, Promise) {
  console.log('Creating topics table...');
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
  console.log('Dropping topics table...');
  return knex.schema.dropTable('topics');
};
