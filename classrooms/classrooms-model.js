const Db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  getBy,
  insert,
  update,
  remove
};

function get(userId) {
  return Db("classrooms as c")
    .join("noise_controller_account as a", "c.id", "=", "a.classroom_id")
    .join("users as u", "u.id", "=", "a.user_id")
    .select(
      "c.id",
      "c.classroom_name",
      "c.score",
      "c.highest_score",
      "u.id as user_id",
      "u.username as teacher"
    )
    .where({ "u.id": userId })
    .distinct("c.id")
    .orderBy("c.id");
}

function getById(id) {
  return Db("classrooms as c")
    .join("noise_controller_account as a", "c.id", "=", "a.classroom_id")
    .join("users as u", "u.id", "=", "a.user_id")
    .select(
      "c.id",
      "c.classroom_name",
      "c.score",
      "c.highest_score",
      "u.id as user_id",
      "u.username as teacher"
    )
    .where({ "c.id": id })
    .first();
}

function getBy(filter) {
  return Db("classrooms")
    .where(filter)
    .first();
}
function insert(classroom) {
  return Db("classrooms")
    .insert(classroom, "id")
    .then(ids => ids[0]);
}
function update(id, classroom) {
  return Db("classrooms")
    .where({ id })
    .update(classroom);
}
function remove(id) {
  return Db("classrooms")
    .where({ id })
    .del();
}
