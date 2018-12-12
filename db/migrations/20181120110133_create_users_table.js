exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (users) => {
    users
      .string('username')
      .primary()
      .notNullable()
      .unique();
    users.string('avatar_url').notNullable();
    users.string('name').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
