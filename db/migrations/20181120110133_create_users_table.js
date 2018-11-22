exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (users) => {
    users
      .increments('user_id')
      .primary()
      .unsigned();
    users.string('username').notNullable();
    users.string('avatar_url').notNullable();
    users.string('name').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
