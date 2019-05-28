exports.up = function(knex, Promise) {
  return knex.schema.alterTable("noise_controller_account", field => {
    field.unique(["user_id", "classroom_id"], "user_classroom"); // uses an index with 2 combination
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("noise_controller_account", field => {
    field.dropUnique(["user_id", "classroom_id"], "user_classroom"); // uses an index with 2 combination
  });
};
