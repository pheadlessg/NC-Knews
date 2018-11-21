exports.up = function(knex, Promise) {
  console.log("Creating users table...");
  return knex.schema.createTable("users", users => {
    users
      .increments("user_id")
      .primary()
      .unsigned();
    users.string("username").notNullable();
    users.string("avatar_url").notNullable();
    users.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("Dropping users table...");
  return knex.schema.dropTable("users");
};
