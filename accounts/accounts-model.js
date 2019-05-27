const Db = require("../data/dbConfig");

module.exports = {
  get,
  getById,
  getBy,
  insert,
  update,
  remove
};

function get() {
  return Db("noise_controller_account as a").orderBy("a.id");
}

async function getById(id) {
  const account = await Db("noise_controller_account as a")
    .join("users as u", "u.id", "=", "a.user_id")
    .where({ "u.id": id })
    .select("a.user_id as userId", "u.username")
    .first();
  const submittedClassroom = await Db("classrooms as c")
    .leftJoin("noise_controller_account as a", "c.id", "=", "a.classroom_id")
    .leftJoin("users as u", "u.id", "=", "a.user_id")
    .select("c.id", "c.classroom_name", "c.score", "c.highest_score")
    .where("a.user_id", id)
    .distinct("a.user_id");
  return {
    ...account,
    submittedClassroom: [...submittedClassroom]
  };
}
function getBy(filter) {
  return Db("noise_controller_account")
    .where(filter)
    .first();
}

function insert(classroom) {
  return Db("noise_controller_account")
    .insert(classroom)
    .returning("noise_controller_account.id")
    .then(ids => ids[0]);
}

function update(id, changes) {
  console.log(id);
  return Db("noise_controller_account")
    .where({ id })
    .update(changes)
    .then(count => getById(id));
}
function remove(id) {
  return Db("noise_controller_account")
    .where({ id })
    .del();
}
