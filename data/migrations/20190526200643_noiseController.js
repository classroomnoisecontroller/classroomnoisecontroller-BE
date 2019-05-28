exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", field => {
      field.increments();
      field
        .string("username", 50)
        .notNullable()
        .unique();
      field.string("password", 1000).notNullable();
    })
    .createTable("classrooms", field => {
      field.increments();
      field.string("classroom_name", 50);
      field.integer("score").defaultTo(0);
      field.integer("highest_score").defaultTo(0);
    })
    .createTable("creatures", field => {
      field.increments();
      field.string("creature_url", 1000);
    })
    .createTable("noise_controller_account", field => {
      field.increments();
      field
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      field
        .integer("classroom_id")
        .unsigned()
        .references("id")
        .inTable("classrooms")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("noise_controller_account")
    .dropTableIfExists("creatures")
    .dropTableIfExists("classrooms")
    .dropTableIfExists("users");
};
