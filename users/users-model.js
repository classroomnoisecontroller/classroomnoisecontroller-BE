const Db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  getFullById,
  getBy,
  insert,
  update,
  remove,
  getClassroomsByUser
};

function get() {
  return Db("users");
}
function getById(id) {
  return Db("users")
    .select(["users.id", "users.username"])
    .where({ id })
    .first();
}

function getFullById(id) {
  return Db("users")
    .where({ id })
    .first();
}

function getBy(filter) {
  return Db("users")
    .where(filter)
    .first();
}

function insert(user) {
  return Db("users")
    .insert(user, "id")
    .then(ids => getById(ids[0]));
}

function update(id, user) {
  return Db("users")
    .where({ id })
    .update(user);
}
function remove(id) {
  return Db("users")
    .where({ id })
    .del();
}

function getClassroomsByUser(filter) {
  console.log(filter);
  return Db("classrooms as c")
    .join("noise_controller_account as a", "c.id", "=", "a.classroom_id")
    .join("users as u", "u.id", "=", "a.user_id")
    .select([
      "u.id as user_id",
      "c.id as classroom_id",
      "c.classroom_name as classroom_name",
      "c.score as score",
      "c.highest_score as highest_score"
    ])
    .where({ "u.id": filter });
}
